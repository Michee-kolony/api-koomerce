const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//variable des routes
const adminRoutes = require('./routes/admin');
const articleRoutes = require('./routes/article');
const clientRoutes = require('./routes/user');
const panierRoutes = require('./routes/panier');
const contactRoutes = require('./routes/contact');
const commandeRoutes = require('./routes/commande');
const tokenRoutes = require('./routes/token');

mongoose.connect('mongodb://kolony:1708roosevelt@187.124.114.57:27017/test?authSource=admin')
  .then(() => {
    console.log('Connecté à MongoDB (VPS)');
  })
  .catch((err) => {
    console.error('Erreur connexion MongoDB:', err.message);
  });

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



//Mes routes
app.use('/auth', adminRoutes);
app.use('/articles', articleRoutes);
app.use('/client', clientRoutes);
app.use('/panier', panierRoutes);
app.use('/contact', contactRoutes);
app.use('/commande', commandeRoutes);
app.use('/tokens', tokenRoutes);


app.get('/', (req, res) => {
  res.send('API Koomerce fonctionne');
});


module.exports = app;