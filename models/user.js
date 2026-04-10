const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nom: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  telephone: {type: String, required: true},
  adresse: {type: String, required: true},
  motdepasse: {type: String, required: true},
  resetToken: String,
  resetTokenExpire: Date
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);