const Article = require('../models/article');

exports.publier = async (req, res, next) => {
    const article = new Article({
        ...req.body
    });

    article.save()
        .then((data) => {

            //ENVOI WEBSOCKET
            const sendNotification = req.app.get('sendNotification');

            if (sendNotification) {
                sendNotification({
                    type: "NEW_ARTICLE",
                    message: "🆕 Nouvel article publié",
                    data: data
                });
            }

            res.status(200).json({
                message: "article publiée avec succèss",
                article: data
            });
        })
        .catch(error =>
            res.status(500).json({ message: "erreur lors de la publication article" })
        );
};

exports.getArticle = async (req, res, next)=>{
    Article.find()
           .then(data=>res.status(200).json(data))
           .catch(error=>res.status(500).json({message: "erreur lors de la récupération des articles"}))
}

exports.getOneArticle = (req, res, next) => {
  Article.findOne({ _id: req.params.id })
    .then(article => {
      if (!article) {
        return res.status(404).json({ message: 'Article non trouvé' });
      }
      // ✅ Retourne l'article complet (prix + prixReduit)
      res.status(200).json(article);
    })
    .catch(error => {
      // Gestion des erreurs (ID invalide, DB down, etc.)
      res.status(500).json({ error });
    });
};


exports.deleteArticle = (req, res, next) => {
  Article.deleteOne({ _id: req.params.id })
    .then(result => {
      if (result.deletedCount === 0) {
        return res.status(404).json({ message: 'Article non trouvé' });
      }
      res.status(200).json({ message: 'Article supprimé' });
    })
    .catch(error => {
      res.status(500).json({ error });
    });
};

exports.updateArticle = (req, res, next) => {
  // Si la réduction ou le prix est modifié, on recalculera le prixReduit
  Article.findOne({ _id: req.params.id })
    .then(article => {
      if (!article) {
        return res.status(404).json({ message: 'Article non trouvé ❌' });
      }

      // Mise à jour des champs
      article.titre = req.body.titre || article.titre;
      article.prix = req.body.prix || article.prix;
      article.description = req.body.description || article.description;
      article.status = req.body.status || article.status;
      article.reduction = req.body.reduction !== undefined ? req.body.reduction : article.reduction;
      article.catégorie = req.body.catégorie || article.catégorie;
      article.nomvendeur = req.body.nomvendeur || article.nomvendeur;
      article.telephonev = req.body.telephonev || article.telephonev;
      article.genre = req.body.genre || article.genre;

      // 🔥 Recalcul du prix réduit
      article.prixReduit = article.reduction > 0 
        ? article.prix - (article.prix * article.reduction / 100)
        : article.prix;

      // Sauvegarde
      return article.save();
    })
    .then(updatedArticle => {
      res.status(200).json({
        message: 'Article mis à jour ✅',
        article: updatedArticle
      });
    })
    .catch(error => {
      res.status(500).json({ error });
    });
};




