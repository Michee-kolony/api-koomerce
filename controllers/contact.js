const Contact = require('../models/contact');


exports.createContact = async (req, res) => {
    const contact = new Contact({
        ...req.body
    })

    contact.save()
        .then(() => res.status(201).json({ message: 'Message envoyé avec succès !' }))
        .catch(error => res.status(400).json({ error }));
}


exports.getAllContacts = async (req, res) => {
    Contact.find()
        .then(contacts => res.status(200).json(contacts))
        .catch(error => res.status(400).json({ error }));
}

exports.deleteContact = async (req, res) => {
    Contact.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Message supprimé avec succès !' }))
        .catch(error => res.status(400).json({ error }));
}