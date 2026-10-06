const http = require('http');
const crypto = require('crypto');

const port = process.env.PORT || 3000;
const randomString = crypto.randomUUID();

let timestamp = new Date().toISOString();
const updateTimestamp = () => {
  timestamp = new Date().toISOString();
};
setInterval(updateTimestamp, 5000);

const server = http.createServer(async (req, res) => {
  let pongs = 0;

  try {
    const response = await fetch('http://pingpong-2-1-svc:2010/pings');
    pongs = await response.text();
  } catch (err) {
    console.error('Error al obtener el contador de pongs:', err);
  }

  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end(`[${timestamp}]: ${randomString}\nPing / Pongs: ${pongs}`);
});

server.listen(port, () => {
  console.log(`Log-output escuchando en el puerto ${port}`);
});