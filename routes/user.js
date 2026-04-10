// routes/auth.js
const express = require('express');
const { register, login, forgotPassword, resetPassword, getUsers } = require('../controllers/user');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);
router.get('/', getUsers);

module.exports = router;