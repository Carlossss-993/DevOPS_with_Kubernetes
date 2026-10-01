const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const port = process.env.PORT || 3000;
const filePath = path.join('/', 'app', 'files', 'counter.txt');
const randomString = crypto.randomUUID();

let timestamp = new Date().toISOString();
const updateTimestamp = () => {
  timestamp = new Date().toISOString();
};
setInterval(updateTimestamp, 5000);

const server = http.createServer((req, res) => {
  
  let pongs = 0;

  try {
    if (fs.existsSync(filePath)) {
      pongs = fs.readFileSync(filePath, 'utf8');
    }
  } catch (err) {
    console.error('Error al leer counter.txt:', err);
  }

  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end(`[${timestamp}]: ${randomString}\nPing / Pongs: ${pongs}`);
});

server.listen(port, () => {
  console.log(`Log-output escuchando en el puerto ${port}`);
});