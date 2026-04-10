const mongoose = require('mongoose');

const adminchema = mongoose.Schema({
    nom:{type: String, required: true},
    email:{type: String, required:true},
    password:{type:String, required:true}
})

module.exports = mongoose.model('Administrateurs', adminchema);

