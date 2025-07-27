const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose'); // ⬅️ Add this
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = 3000;

// ✅ MongoDB Connection
mongoose.connect('mongodb://localhost:27017/axion-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Connected to MongoDB (Local)'))
.catch(err => console.error('❌ MongoDB connection error:', err.message));

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads')); // Serve uploaded files
app.use('/api', userRoutes); // Mount our routes

// Server
app.listen(PORT, () => {
  console.log(`🚀 Backend server running at http://localhost:${PORT}`);
});
