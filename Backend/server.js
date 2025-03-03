const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const transactionRoutes = require('./routes/transactions');
const cors=require("cors")
// Create an Express application
const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = 'your_jwt_secret_key';

// Connect to MongoDB
mongoose.connect('mongodb+srv://shyam18:shyamkumar18@cluster0.wlav0xw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware for parsing JSON bodies
app.use(bodyParser.json());
app.use(cors())
// Define routes
app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})
// Export the app for use in other files (e.g., socket.js)
module.exports = app;