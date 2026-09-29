const http = require('http');
const crypto = require('crypto');

const randomString = crypto.randomUUID();
const port = process.env.PORT || 3000;

var fullMessage = ''

function getMessage() {
  const timestamp = new Date().toISOString();
  fullMessage = `[${timestamp}]: ${randomString}`;
}

setInterval(getMessage, 5000);

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(fullMessage);
});

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});