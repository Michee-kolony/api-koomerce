const mongoose = require('mongoose');

const articleSchema = mongoose.Schema({
  titre: { type: String, required: true, trim: true },
  prix: { type: Number, required: true },
  description: { type: String, required: true },
  image1: {type: String, required: true},
  image2:{type: String, required: true},
  image3:{type: String, required: true},
  status: {type: String, required: true, default: "neuf(ve)", enum: ["neuf(ve)", "occasion"] },
  reduction: { type: Number, required: true, default: 0 }, // en pourcentage
  categorie: { type: String, required: true },
  nomvendeur: { type: String, required: true },
  telephonev: { type: String, required: true },
  genre: { type: String },
  prixReduit: { type: Number }, // prix après réduction calculé
  createdAt: { type: Date, default: Date.now }
});

// 🔥 Middleware pour calculer automatiquement le prix après réduction
articleSchema.pre('save', function(next) {
  if (this.reduction > 0) {
    this.prixReduit = this.prix - (this.prix * this.reduction / 100);
  } else {
    this.prixReduit = this.prix;
  }
});

// 📦 Export du modèle
module.exports = mongoose.model('Article', articleSchema);