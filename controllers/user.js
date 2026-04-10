// controllers/authController.js
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

// ⚡ CONFIGURATION EMAIL
const transporter = nodemailer.createTransport({
  host: "mail.ayemtech.com",
  port: 465,
  secure: true,
  auth: {
    user: "messagerie@ayemtech.com",
    pass: "ayemtech@17"
  }
});


// ✅ REGISTER
exports.register = (req, res) => {
  const { nom, email, telephone, adresse, motdepasse } = req.body;

  User.findOne({ email })
    .then(exist => {
      if (exist) {
        return res.status(400).json({ message: "Email déjà utilisé" });
      }

      return bcrypt.hash(motdepasse, 10)
        .then(hash => {
          const user = new User({
            nom,
            email,
            telephone,
            adresse,
            motdepasse: hash
          });

          return user.save();
        })
        .then(() => {
          res.status(201).json({ message: "Compte créé avec succès" });
        });
    })
    .catch(error => {
      res.status(500).json({ error });
    });
};


// LOGIN
exports.login = (req, res) => {
  const { email, motdepasse } = req.body;

  User.findOne({ email })
    .then(user => {
      if (!user) {
        return res.status(404).json({ message: "Utilisateur introuvable" });
      }

      bcrypt.compare(motdepasse, user.motdepasse)
        .then(match => {
          if (!match) {
            return res.status(400).json({ message: "Mot de passe incorrect" });
          }

          const token = jwt.sign(
            { id: user._id, role: "user" },
            "SECRET_KEY",
            { expiresIn: "1d" }
          );

          res.json({ token, user });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};


// ✅ FORGOT PASSWORD
exports.forgotPassword = (req, res) => {
  const { email } = req.body;

  User.findOne({ email })
    .then(user => {
      if (!user) {
        return res.status(404).json({ message: "Utilisateur non trouvé" });
      }

      const token = crypto.randomBytes(32).toString('hex');

      user.resetToken = token;
      user.resetTokenExpire = Date.now() + 3600000;

      return user.save()
        .then(() => {
          const resetLink = `https://koomerce.shop/reset-password/${token}`;

          return transporter.sendMail({
            from: "Ayemtech <messagerie@ayemtech.com>",
            to: user.email,
            subject: "Réinitialisation du mot de passe",
            html: `
              <h3>Réinitialisation du mot de passe de votre compte dans notre application koomerce pour plus de sécurité</h3>
              <p>Clique sur le lien ci-dessous :</p>
              <a href="${resetLink}">Réinitialiser mon mot de passe</a>
            `
          });
        })
        .then(() => {
          res.json({ message: "Email envoyé avec succès" });
        });
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ error });
    });
};


// ✅ RESET PASSWORD
exports.resetPassword = (req, res) => {
  const { token } = req.params;
  const { motdepasse } = req.body;

  User.findOne({
    resetToken: token,
    resetTokenExpire: { $gt: Date.now() }
  })
    .then(user => {
      if (!user) {
        return res.status(400).json({ message: "Token invalide ou expiré" });
      }

      return bcrypt.hash(motdepasse, 10)
        .then(hash => {
          user.motdepasse = hash;
          user.resetToken = undefined;
          user.resetTokenExpire = undefined;

          return user.save();
        })
        .then(() => {
          res.json({ message: "Mot de passe réinitialisé avec succès" });
        });
    })
    .catch(error => {
      res.status(500).json({ error });
    });
};


exports.getUsers = (req, res) => {
  User.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      res.status(500).json({ error });
    });
};