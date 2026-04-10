const Admin = require('../models/admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.createAdmin = (req, res, next) => {

  // 🔐 Hash du mot de passe
  bcrypt.hash(req.body.password, 10)
    .then(hash => {

      //Création admin
      const admin = new Admin({
        nom: req.body.nom,
        email: req.body.email,
        password: hash
      });

      //Sauvegarde en base
      return admin.save();
    })
    .then(() => {
      //Réponse succès
      res.status(201).json({
        message: 'Admin créé avec succès'
      });
    })
    .catch(error => {
      //Gestion des erreurs
      res.status(500).json({ error });
    });
};

exports.loginAdmin = (req, res, next) => {

  //Vérifier si l'admin existe
  Admin.findOne({ email: req.body.email })
    .then(admin => {

      if (!admin) {
        return res.status(401).json({
          message: 'Email incorrect'
        });
      }

      //Comparer mot de passe
      return bcrypt.compare(req.body.password, admin.password)
        .then(valid => {

          if (!valid) {
            return res.status(401).json({
              message: 'Mot de passe incorrect'
            });
          }

          // Génération du token
          const token = jwt.sign(
            { userId: admin._id, role: "admin" },
            'SECRET_KEY', //à sécuriser avec .env
            { expiresIn: '24h' }
          );

          //Réponse succès
          res.status(200).json({
            message: 'Connexion réussie',
            token: token,
            adminId: admin._id,
            nom: admin.nom,
            email: admin.email
          });
        });
    })
    .catch(error => {
      res.status(500).json({ error });
    });
};

exports.getAdmin = (req, res, next)=>{
    Admin.find()
         .then(data=>res.status(200).json(data))
         .catch(error=>res.status(500).json(error))
}