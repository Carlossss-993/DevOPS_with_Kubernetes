const http = require('http');

const port = process.env.PORT || 3000;

let cont = 0;
const server = http.createServer((req, res) => {
  if (req.url === '/pingpong') {
    cont++;

    res.writeHead(200, { 'Content-Type': 'text/plain' });
    return res.end(`Pong ${cont}`);
  }
  if (req.url === '/pings') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    return res.end(cont.toString());
  }

  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Not Found');
});

server.listen(port, () => {
  console.log(`Ping-pong escuchando en el puerto ${port}`);
});