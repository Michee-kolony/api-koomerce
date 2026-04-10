const express = require('express');
const { ajouterAuPanier, getPanier, deletePanier } = require('../controllers/panier');
const router = express.Router();
const auth = require('../middlewares/auth');


router.post('/', auth.authUser, ajouterAuPanier);
router.get('/', auth.authUser, getPanier);
router.delete('/:id', auth.authUser, deletePanier);

module.exports = router;