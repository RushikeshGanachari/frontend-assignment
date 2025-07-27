// models/LoginUser.js
const mongoose = require('mongoose');

const loginUserSchema = new mongoose.Schema({
  username: String,
  password: String  // plain text for simplicity (not for production)
});

module.exports = mongoose.model('LoginUser', loginUserSchema);
