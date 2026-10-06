const http = require('http');

const port = process.env.PORT || 3000;

let todos = ['Learn Kubernetes basics', 'Deploy applications to cluster', 'Configure persistent volumes'];

const server = http.createServer((req, res) => {
  if (req.url === '/todos' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(todos));
  } 
  
  if (req.url === '/todos' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        const newTodo = JSON.parse(body).task;
        if (newTodo && newTodo.trim() !== '') {
          todos.push(newTodo);
          res.writeHead(201, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({ message: 'Todo added successfully' }));
        }
      } catch (err) {
        console.error('Error parsing JSON:', err);
      }

      res.writeHead(400, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ error: 'Invalid request body' }));
    });

    return;
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Not Found' }));
});

server.listen(port, () => {
  console.log(`Todo backend server is running on port ${port}`);
});