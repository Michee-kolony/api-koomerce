const Commande = require('../models/commande');

exports.createCommande = async (req, res, next)=>{
    const commande = new Commande({
        ...req.body
    })
    commande.save()
        .then(() => res.status(201).json({ message: 'Commande créée avec succès !' }))
        .catch(error => res.status(400).json({ error }));
}

exports.getAllCommandes = async (req, res, next)=>{
    Commande.find()
        .then(commandes => res.status(200).json(commandes))
        .catch(error => res.status(400).json({ error }));
}

exports.deleteCommande = async (req, res, next)=>{
    Commande.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Commande supprimée avec succès !' }))
        .catch(error => res.status(400).json({ error }));
}

exports.getOneCommande = async (req, res, next)=>{
    Commande.findOne({ _id: req.params.id })
        .then(commande => res.status(200).json(commande))
        .catch(error => res.status(404).json({ error }));
}

exports.updateCommande = async (req, res, next) =>{
    Commande.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Commande modifiée avec succès !' }))
        .catch(error => res.status(400).json({ error }));
}

