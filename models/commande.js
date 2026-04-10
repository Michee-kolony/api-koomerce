const mongoose = require('mongoose');

const CommandeSchema = new mongoose.Schema({
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    titre: { type: String, required: true },
    image1: { type: String, required: true },
    prix: { type: Number, required: true },
    quantite: { type: Number, required: true },
    nomclient: { type: String, required: true },
    telephoneclient: { type: String, required: true },
    nomvendeur: { type: String, required: true },
    numerovendeur: { type: String, required: true },
    status: { type: String, default: 'En cours' },
    createdAt: { type: Date, default: Date.now }
})


module.exports = mongoose.model('Commandes', CommandeSchema);