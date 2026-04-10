const express = require('express');
const router = express.Router();
const Token = require('../models/token');

// 🔥 sauvegarder token utilisateur
router.post('/save', async (req, res) => {
  try {
    const { token } = req.body;

    const exists = await Token.findOne({ token });

    if (!exists) {
      await Token.create({ token });
    }

    res.status(200).json({ message: "Token enregistré" });

  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = router;