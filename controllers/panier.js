const Panier = require('../models/panier');


exports.ajouterAuPanier = async (req, res) => {
    const panier = new Panier({
        ...req.body
    })

    panier.save()
          .then(() => res.status(201).json({ message: 'Produit ajouté au panier avec succès' }))
          .catch(err => res.status(400).json({ error: err.message }));
          
}

exports.getPanier = async (req, res) => {
    Panier.find()
          .then(panier => res.status(200).json(panier))
          .catch(err => res.status(400).json({ error: err.message }));
}

exports.deletePanier = (req, res) => {
  Panier.deleteOne({ _id: req.params.id })
        .then(result => {

        if (result.deletedCount === 0) {
        return res.status(404).json({
          message: "Panier introuvable"
        });
      }

      res.status(200).json({
        message: "Panier supprimé avec succès"
      });

    })
    .catch(err => {
      res.status(500).json({
        error: err.message
      });
    });
};

