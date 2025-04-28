const express = require('express');
const router = express.Router();

// Predefined responses
const responses = {
    "hello": "Hi there! How can I help you today?",
    "how are you": "I'm just a chatbot, but I'm here to assist you!",
    "help": "You can ask me about your expenses, income, and financial tips!",
    "how to save money": "Track your spending, cut unnecessary expenses, and set clear savings goals.",
    "how to reduce expenses": "Review your subscriptions, plan meals, buy in bulk, and avoid impulse purchases.",
    "how to improve life on money": "Focus on budgeting, saving, investing, and continuous learning about personal finance.",
    "how to increase income": "Consider upskilling, freelancing, side hustles, or asking for a raise.",
    "default": "I'm not sure about that. Try asking me about savings, income, or expenses!"
};

router.post('/chat', (req, res) => {
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ message: "Message is required." });
    }

    const lowerCaseMessage = message.toLowerCase().trim();
    const botReply = responses[lowerCaseMessage] || responses["default"];

    res.json({ message: botReply });
});

module.exports = router;
