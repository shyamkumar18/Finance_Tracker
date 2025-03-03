document.addEventListener("DOMContentLoaded", () => {
    const loginPage = document.getElementById("login-page");
    const registerPage = document.getElementById("register-page");
    const dashboardPage = document.getElementById("dashboard-page");

    const goToRegister = document.getElementById("go-to-register");
    const goToLogin = document.getElementById("go-to-login");
    const logoutButton = document.getElementById("logout-button");

    const loginForm = document.getElementById("login-form");
    const registerForm = document.getElementById("register-form");
    const incomeExpenseForm = document.getElementById("income-expense");

    const totalIncome = document.getElementById("total-income");
    const totalExpenses = document.getElementById("total-expenses");
    const annualIncome = document.getElementById("annual-income");
    const annualExpenses = document.getElementById("annual-expenses");
    const monthlyIncome = document.getElementById("monthly-income");
    const monthlyExpenses = document.getElementById("monthly-expenses");
    const transactionsDiv = document.getElementById("transactions");

    const chatbox = document.getElementById("chatbox");
    const chatForm = document.getElementById("chat-form");
    const chatInput = document.getElementById("chat-input");

    let transactions = [];
    let user = null;

    goToRegister.addEventListener("click", () => {
        loginPage.classList.remove("active");
        registerPage.classList.add("active");
    });

    goToLogin.addEventListener("click", () => {
        registerPage.classList.remove("active");
        loginPage.classList.add("active");
    });

    logoutButton.addEventListener("click", () => {
        user = null;
        dashboardPage.classList.remove("active");
        loginPage.classList.add("active");
    });

    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const username = document.getElementById("login-username").value;
        const password = document.getElementById("login-password").value;

        // Simulate login process
        const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            user = await response.json();
            loginPage.classList.remove("active");
            dashboardPage.classList.add("active");
            loadTransactions();
        } else {
            alert("Login failed. Please check your credentials.");
        }
    });

    registerForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const username = document.getElementById("register-username").value;
        const password = document.getElementById("register-password").value;

        // Simulate registration process
        const response = await fetch("/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            alert("Registration successful. Please login.");
            registerPage.classList.remove("active");
            loginPage.classList.add("active");
        } else {
            alert("Registration failed. Please try again.");
        }
    });

    incomeExpenseForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const description = document.getElementById("description").value;
        const amount = parseFloat(document.getElementById("amount").value);
        const type = document.getElementById("type").value;

        const transaction = {
            description,
            amount,
            type,
            date: new Date()
        };

        // Simulate adding transaction
        const response = await fetch("/api/transactions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user.token}`
            },
            body: JSON.stringify(transaction)
        });

        if (response.ok) {
            transactions.push(await response.json());
            updateSummary();
        } else {
            alert("Failed to add transaction. Please try again.");
        }
    });

    async function loadTransactions() {
        // Simulate fetching transactions
        const response = await fetch("/api/transactions", {
            headers: {
                "Authorization": `Bearer ${user.token}`
            }
        });

        if (response.ok) {
            transactions = await response.json();
            updateSummary();
        } else {
            alert("Failed to load transactions. Please try again.");
        }
    }

    function updateSummary() {
        const totalIncomeAmount = transactions.filter(t => t.type === "income").reduce((sum, t) => sum + t.amount, 0);
        const totalExpensesAmount = transactions.filter(t => t.type === "expense").reduce((sum, t) => sum + t.amount, 0);

        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth();

        const annualIncomeAmount = transactions.filter(t => t.type === "income" && new Date(t.date).getFullYear() === currentYear).reduce((sum, t) => sum + t.amount, 0);
        const annualExpensesAmount = transactions.filter(t => t.type === "expense" && new Date(t.date).getFullYear() === currentYear).reduce((sum, t) => sum + t.amount, 0);

        const monthlyIncomeAmount = transactions.filter(t => t.type === "income" && new Date(t.date).getFullYear() === currentYear && new Date(t.date).getMonth() === currentMonth).reduce((sum, t) => sum + t.amount, 0);
        const monthlyExpensesAmount = transactions.filter(t => t.type === "expense" && new Date(t.date).getFullYear() === currentYear && new Date(t.date).getMonth() === currentMonth).reduce((sum, t) => sum + t.amount, 0);

        totalIncome.textContent = totalIncomeAmount.toFixed(2);
        totalExpenses.textContent = totalExpensesAmount.toFixed(2);
        annualIncome.textContent = annualIncomeAmount.toFixed(2);
        annualExpenses.textContent = annualExpensesAmount.toFixed(2);
        monthlyIncome.textContent = monthlyIncomeAmount.toFixed(2);
        monthlyExpenses.textContent = monthlyExpensesAmount.toFixed(2);

        transactionsDiv.innerHTML = transactions.map(t => `<p>${t.date} - ${t.description}: ${t.amount} (${t.type})</p>`).join("");
    }

    chatForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const message = chatInput.value;
        chatInput.value = "";

        chatbox.innerHTML += `<p><strong>You:</strong> ${message}</p>`;
        handleChatMessage(message);
    });

    function handleChatMessage(message) {
        let response = "I'm sorry, I don't understand that question.";

        if (message.toLowerCase().includes("income")) {
            response = "Income is the money that you receive.";
        } else if (message.toLowerCase().includes("expense")) {
            response = "Expense is the money that you spend.";
        } else if (message.toLowerCase().includes("manage expenses")) {
            response = "To manage expenses, you should track your spending and create a budget.";
        } else if (message.toLowerCase().includes("total income")) {
            response = `Your total income is ${totalIncome.textContent}.`;
        } else if (message.toLowerCase().includes("total expenses")) {
            response = `Your total expenses are ${totalExpenses.textContent}.`;
        }

        chatbox.innerHTML += `<p><strong>Bot:</strong> ${response}</p>`;
        chatbox.scrollTop = chatbox.scrollHeight;
    }
});