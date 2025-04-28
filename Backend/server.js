const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const transactionRoutes = require('./routes/transactions');
const chatbotRoutes = require('./routes/chatbot');
const cors = require("cors");


const app = express();
const JWT_SECRET = 'Ace18';


mongoose.connect('mongodb+srv://shyam18:shyamkumar18@cluster0.wlav0xw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));


app.use(bodyParser.json());
app.use(cors());


app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/chatbot', chatbotRoutes);

module.exports = app;