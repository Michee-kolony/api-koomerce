const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    email: { type: String, required: true },
    telephone: { type: String, required: true },
    sujet: { type: String, required: true },
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Contact', ContactSchema);