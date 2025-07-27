const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  mobile: String,
  address: String,
  skills: String,
  hobbies: String,
  fileName: String,
  photoPath: String
});

module.exports = mongoose.model('User', userSchema);
