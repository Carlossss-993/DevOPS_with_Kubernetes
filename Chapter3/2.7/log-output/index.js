const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const port = process.env.PORT || 3000;
const randomString = crypto.randomUUID();

configFilePath = path.join('/', 'app', 'config', 'information.txt');

let timestamp = new Date().toISOString();
const updateTimestamp = () => {
  timestamp = new Date().toISOString();
};
setInterval(updateTimestamp, 5000);

const server = http.createServer(async (req, res) => {
  if (req.url === 'favicon.ico') {
    res.writeHead(204);
    return res.end();
  }

  const messageEnv = process.env.MESSAGE || 'Can\'t find MESSAGE env variable'
  let fileContent = '';
  try {
    fileContent = fs.readFileSync(configFilePath, 'utf8');
  } catch (err) {
    console.error('Error al leer el archivo de configuración:', err);
  }

  let pongs = 0;
  try {
    const response = await fetch('http://pingpong-2-7-svc:2010/pings');
    pongs = await response.text();
  } catch (err) {
    console.error('Error al obtener el contador de pongs:', err);
  }

  const logMessage = `
    fileContent: ${fileContent.trim()}\n
    env variable: MESSAGE=${messageEnv}\n
    ${timestamp}: ${randomString}.\n
    Ping / Pongs: ${pongs}
  `;

  res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(logMessage);
  });

server.listen(port, () => {
  console.log(`Log-output escuchando en el puerto ${port}`);
});