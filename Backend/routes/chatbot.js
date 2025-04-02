const express = require('express');

const router = express.Router();

// Predefined responses
const responses = {
    "hello": "Hi there! How can I help you today?",
    "how are you": "I'm just a chatbox, but I'm here to help you with your expense tracking!",
    "help": "Sure! You can ask me about your expenses, income, and more.",
    "how to save money": "To save money, create a budget, track your expenses, reduce unnecessary spending, and set savings goals.",
    "how to reduce expenses": "To reduce expenses, cut down on non-essential spending, look for discounts, and negotiate bills where possible.",
    "how to improve life on money": "To improve your financial well-being, focus on saving, investing wisely, and making informed financial decisions.",
    "how to increase income": "To increase your income, consider asking for a raise, finding a side job, or investing in skills that can lead to higher-paying opportunities.",
    "default": "I'm not sure how to respond to that. You can ask me about your expenses, income, and more."
};

router.post('/chat', (req, res) => {
    const { message } = req.body;
    const lowerCaseMessage = message.toLowerCase();

    const response = responses[lowerCaseMessage] || responses["default"];
    res.json({ message: response });
});

module.exports = router;