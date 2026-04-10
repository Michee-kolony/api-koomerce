const express = require('express');
const { createCommande, getAllCommandes, deleteCommande, getOneCommande, updateCommande } = require('../controllers/commande');
const router = express.Router();
const auth = require('../middlewares/auth');
const authany = require('../middlewares/authany');

router.post('/', auth.authUser, createCommande);
router.get('/', authany.authAny, getAllCommandes);
router.delete('/:id', authany.authAny, deleteCommande);
router.get('/:id', authany.authAny, getOneCommande);
router.put('/:id', authany.authAny, updateCommande);

module.exports = router;