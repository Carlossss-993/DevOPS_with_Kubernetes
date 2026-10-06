const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const directoryPath = path.join('/', 'app', 'files');
const imagePath = path.join(directoryPath, 'image.jpg');

if (!fs.existsSync(directoryPath)) {
  try {
    fs.mkdirSync(directoryPath, { recursive: true });
  } catch (err) {
    console.error('Error al crear el directorio:', err);
  }
}

const isImageOutdated = () => {
  if (!fs.existsSync(imagePath)) return true

  const stats = fs.statSync(imagePath);
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
    fs.writeFileSync(imagePath, buffer);
  } catch (err) {
    console.error('Error al descargar la imagen:', err);
  }
};

const server = http.createServer(async (req, res) => {
  if (req.url === '/favicon.ico') {
    res.writeHead(204);
    return res.end();
  }
  
  await fetchImage();

  if (req.url === '/image') {
    const image = fs.readFileSync(imagePath);
    res.writeHead(200, { 'Content-Type': 'image/jpeg' });
    return res.end(image);
  }

  if (req.url === '/tasks' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', async () => {
      const params = new URLSearchParams(body);
      const task = params.get('task');
      if (task && task.trim() !== '') {
        try {
          await fetch('http://todobackend-2-2-svc:2010/todos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ task })
          });
        } catch (error) {
          console.error('Error al enviar la tarea al backend:', error);
        }
      }

      res.writeHead(302, { 'Location': '/' });
      res.end();
    });
  }

  if (req.url === '/') {
    let tasks = [];
    try {
      tasks = await fetch('http://todobackend-2-2-svc:2010/todos')
        .then(response => response.json());
    }
    catch (error) {
      console.error('Error al obtener las tareas del backend:', error);
    }

    const taskListHtml = tasks.map(task => `<li>${task}</li>`).join('');

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
      <html>
        <head>
          <title>TODO APP</title>
          <style>
            div {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              height: 100vh;
              gap: 20px;
            }
            h1 {
              font-size: 24px;
              margin: 0;
            }
            h2 {
              font-size: 20px;
              margin: 0;
            }
            ul {
              display: flex;
              width: 100%;
              max-width: 400px;
              flex-direction: column;
              list-style-type: none;
              gap: 10px;
              margin: 0;
              padding: 0;
            }
            li {
              border: 1px solid #ccc;
              padding: 6px;
              border-radius: 12px;
            }  
          </style>
        </head>
        <body>
          <div ">
            <h1>TODO APP</h1>
            <img src="/image" alt="Random Photo" width="400" />
            <form action="/tasks" method="post">
              <input type="text" name="task" placeholder="Enter a task" />
              <button type="submit">Submit</button>
            </form>
            <h2>Todos</h2>
            <ul>
              ${taskListHtml}
            </ul>
            <p>Devops with Kubernetes 2026</p> 
          </div>
        </body>
      </html>
    `);
  }
});

server.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`);
});