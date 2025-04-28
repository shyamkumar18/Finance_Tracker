# Expense Tracker

A simple web-based expense tracker application with user authentication, real-time updates, and a chatbot interface for managing expenses.

## Features

- User registration and login
- Add income and expenses
- View summary of total, annual, and monthly income and expenses
- Real-time updates using WebSockets
- Chatbot for asking questions about managing expenses

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- Socket.io
- HTML, CSS, JavaScript

## Prerequisites

- Node.js and npm installed
- MongoDB installed and running

## Project Structure

```
expense-tracker/
├── backend/
│   ├── models/
│   │   ├── transaction.js
│   │   └── user.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── transactions.js
│   ├── socket.js
│   └── server.js
├── frontend/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   └── scripts.js
│   └── index.html
├── .gitignore
├── package.json
└── README.md
```

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/shyamkumar18/expense-tracker.git
   cd expense-tracker
   ```

2. Install backend dependencies:
   ```sh
   cd backend
   npm install
   ```

3. Start the MongoDB server:
   ```sh
   # On Linux
   sudo systemctl start mongod

   # On macOS using Homebrew
   brew services start mongodb-community@4.4

   # On Windows, start the MongoDB service from the Services management console
   ```

4. Start the backend server:
   ```sh
   node socket.js
   ```

5. Open the `frontend/index.html` file in a web browser to interact with the application.

## Usage

1. Open the application in a web browser.
2. Register a new user or log in with existing credentials.
3. Add income and expenses using the provided form.
4. View the summary of income and expenses in the dashboard.
5. Use the chatbot to ask questions about managing expenses.
