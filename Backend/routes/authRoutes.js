// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const LoginUser = require('../models/LoginUser');

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await LoginUser.findOne({ username, password });
    if (user) {
      res.json({ success: true, message: 'Login successful' });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
