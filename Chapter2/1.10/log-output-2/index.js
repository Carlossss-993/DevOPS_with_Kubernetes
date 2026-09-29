const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;

const directory = path.join('/', 'app', 'files');

const getMessage = () => {
  try {
    return fs.readFileSync(path.join(directory, 'random-string.txt'), 'utf-8');
  } catch (err) {
    console.error('FAILED TO READ FILE', '----------------', err);
    return 'Error reading file';
  }
};

const server = http.createServer(async (req, res) => {
  if (req.url === '/favicon.ico') {
    res.writeHead(204);
    return res.end();
  }
  const message = getMessage();
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end(message);
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});