const http = require('http');
const app = require('./server');
const notifications = require('./notifications');

const PORT = process.env.PORT || 3000;


const server = http.createServer(app);
notifications.init(server);

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
