const express = require('express');
const jwt = require('jsonwebtoken');
const Transaction = require('../models/transaction');
const { notifyClients } = require('../notifications');

const router = express.Router();
const JWT_SECRET = 'your_jwt_secret_key';

// Middleware to authenticate the user
function authenticate(req, res, next) {
    const token = req.headers['authorization'].split(' ')[1];
    try {
        const payload = jwt.verify(token, JWT_SECRET);
        req.user = payload;
        next();
    } catch (error) {
        res.status(401).send('Unauthorized');
    }
}

// Endpoint to add a new transaction
router.post('/', authenticate, async (req, res) => {
    const { description, amount, type } = req.body;
    const transaction = new Transaction({
        userId: req.user.userId,
        description,
        amount,
        type,
        date: new Date()
    });
    try {
        await transaction.save();
        notifyClients(transaction);
        res.status(201).json(transaction);
    } catch (error) {
        res.status(400).send('Error adding transaction');
    }
});

// Endpoint to get all transactions for a user
router.get('/', authenticate, async (req, res) => {
    try {
        const transactions = await Transaction.find({ userId: req.user.userId });
        res.json(transactions);
    } catch (error) {
        res.status(500).send('Error fetching transactions');
    }
});

module.exports = router;