const http = require('http');

const port = process.env.PORT || 3000;

var cont = 0;

const server = http.createServer((req, res) => {
  if (req.url === '/pingpong') {
    cont++;
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(`Pong ${cont}`);
  }
});

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});