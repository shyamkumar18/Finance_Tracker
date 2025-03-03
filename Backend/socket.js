const http = require('http');
const app = require('./server');
const notifications = require('./notifications');

const server = http.createServer(app);
notifications.init(server);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});