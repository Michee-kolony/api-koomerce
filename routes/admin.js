const express = require('express');
const { createAdmin, loginAdmin, getAdmin } = require('../controllers/admin');
const router = express.Router();

router.post('/register', createAdmin);
router.post('/login', loginAdmin);
router.get('/', getAdmin);


module.exports = router;