const mongoose = require('mongoose');

const PanierSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    produitId: {type: mongoose.Schema.Types.ObjectId, ref: 'Article', required: true},
    titre: { type: String, required: true },
    prixReduit: { type: Number },
    image: { type: String, required: true },
    quantite: { type: Number, default: 1 },
    nomvendeur: { type: String, required: true },
    telephonev: { type: String, required: true }   
}, { timestamps: true });

module.exports = mongoose.model('Panier', PanierSchema);