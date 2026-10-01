const http = require('http');
const fs = require('fs');
const path = require('path');

const port = process.env.PORT || 3000;
const filePath = path.join('/', 'app', 'files', 'counter.txt');

if (!fs.existsSync(filePath)) {
  try {
    fs.writeFileSync(filePath, '0');
  } catch (err) {
    console.error('Error al inicializar counter.txt:', err);
  }
}

let cont = 0;
try {
  if (fs.existsSync(filePath)) {
    cont = parseInt(fs.readFileSync(filePath, 'utf8')) || 0;
  }
} catch (err) {
  console.error('Error al leer counter.txt:', err);
}

const server = http.createServer((req, res) => {
  if (req.url === '/pingpong') {
    cont++;

    try {
      fs.writeFileSync(filePath, cont.toString());
    } catch (err) {
      console.error('Error al escribir en counter.txt:', err);
    }

    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(`Pong ${cont}`);
  }
});

server.listen(port, () => {
  console.log(`Ping-pong escuchando en el puerto ${port}`);
});