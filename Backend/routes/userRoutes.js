const express = require('express');
const multer = require('multer');
const User = require('../models/User');

const router = express.Router();

// File upload setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// POST route to save user
router.post('/users', upload.single('photo'), async (req, res) => {
  try {
    const newUser = new User({
      ...req.body,
      fileName: req.file?.originalname || '',
      photoPath: req.file?.path || ''
    });
    await newUser.save();
    res.status(201).json({ message: 'User saved successfully' });
  } catch (err) {
    console.error('Error saving user:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET route to fetch users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router; // ✅ Important: Export the router
