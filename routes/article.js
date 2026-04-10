const express = require('express');
const { publier, getArticle, getOneArticle, deleteArticle, updateArticle } = require('../controllers/article');
const router = express.Router();
const auth = require('../middlewares/auth');

router.post('/',  publier);
router.get('/', getArticle);
router.get('/:id', getOneArticle);
router.delete('/:id', auth.authAdmin, deleteArticle);
router.put('/:id', auth.authAdmin, updateArticle);

module.exports = router;