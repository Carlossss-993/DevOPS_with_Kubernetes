const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const directoryPath = path.join('/', 'app', 'files');
const filePath = path.join(directoryPath, 'image.jpg');

if (!fs.existsSync(directoryPath)) {
  try {
    fs.mkdirSync(directoryPath, { recursive: true });
  } catch (err) {
    console.error('Error al crear el directorio:', err);
  }
}

const isImageOutdated = () => {
  if (!fs.existsSync(filePath)) return true

  const stats = fs.statSync(filePath);
  const now = new Date().getTime();
  const fileAge = now - stats.mtime.getTime();

  return fileAge > 10 * 60 * 1000; 
};

const fetchImage = async () => {
  if (!isImageOutdated()) return;
  try {
    const response = await fetch('https://picsum.photos/1200');
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const buffer = Buffer.from(await response.arrayBuffer());
    fs.writeFileSync(filePath, buffer);
  } catch (err) {
    console.error('Error al descargar la imagen:', err);
  }
};

const server = http.createServer(async (req, res) => {
  await fetchImage();
  if (req.url === '/image') {
    const image = fs.readFileSync(filePath);
    res.writeHead(200, { 'Content-Type': 'image/jpeg' });
    res.end(image);
  }
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
      <div style="text-align: center; margin-top: 50px;">
        <h1>TODO APP</h1>
        <img src="/image" alt="Random Photo" width="400" />
        <p>Devops with Kubernetes 2026</p> 
      </div>
    `);
  }
});

server.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`);
});