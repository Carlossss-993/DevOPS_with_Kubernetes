const http = require('http');
const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  if (req.url === '/help') {
    res.end('This is the help page for 1.5 app!');
  } else {
    res.end('Hello from 1.5 app!');
  }
});

server.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`);
});