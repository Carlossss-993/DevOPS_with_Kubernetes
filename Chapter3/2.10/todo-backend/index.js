const http = require('http');
const { Pool } = require('pg');

const port = process.env.PORT || 8080;
const pool = new Pool({
  user: process.env.POSTGRES_USER || 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  database: process.env.POSTGRES_DB || 'todos',
  password: process.env.POSTGRES_PASSWORD || 'password',
  port: process.env.POSTGRES_PORT || 5432,
});

const createTableQuery = `
  CREATE TABLE IF NOT EXISTS todos (
    id SERIAL PRIMARY KEY,
    task TEXT NOT NULL
  );
`;

const insertInitialTodosQuery = `
  INSERT INTO todos (task)
  VALUES ('Learn Kubernetes basics'),
         ('Deploy applications to cluster'),
         ('Configure persistent volumes')
  ON CONFLICT (id) DO NOTHING;
`;

const getTodosQuery = `
  SELECT task FROM todos;
`;

const addTodoQuery = `
  INSERT INTO todos (task) VALUES ($1);
`;

const initDb = async (retries = 10, delay = 3000) => {
  while (retries > 0) {
    try {
      await pool.query(createTableQuery);
      await pool.query(insertInitialTodosQuery);
      console.log('Base de datos e inicialización completada con éxito');
      return; // Conexión exitosa, sale del bucle
    } catch (err) {
      console.error(`Postgres no está listo aún. Reintentando en ${delay / 1000}s... (${retries} intentos restantes)`);
      retries -= 1;
      await new Promise(res => setTimeout(res, delay));
    }
  }
  console.error('No se pudo conectar a la base de datos tras múltiples intentos.');
};

const getTodos = async () => {
  try {
    const res = await pool.query(getTodosQuery);
    return res.rows.map(row => row.task);
  } catch (err) {
    console.error('Error getting todos from the database:', err);
    return [];
  }
};

const addTodo = async (task) => {
  try {
    await pool.query(addTodoQuery, [task]);
  } catch (err) {
    console.error('Error adding todo to the database:', err);
  }
};

const server = http.createServer(async (req, res) => {
  if (req.url === '/todos' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    const todos = await getTodos();
    return res.end(JSON.stringify(todos));
  } 
  
  if (req.url === '/todos' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', async () => {
      try {
        const newTodo = JSON.parse(body).task;

        console.log(`[REQUEST] POST /todos received`);

        if (!newTodo || newTodo.trim() === '') {
          console.warn('[REJECTED] Received empty todo');
          res.writeHead(400, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({ error: 'Task cannot be empty' }));
        }

        if (newTodo.length > 140) {
          console.warn(`[BLOCKED] Todo exceeds 140 characters limit (${newTodo.length} chars): "${newTodo}"`);
          res.writeHead(400, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({ error: 'Todo exceeds 140 characters limit' }));
        }

        await addTodo(newTodo);
        console.log(`[SUCCESS] Todo saved successfully: "${newTodo}"`);

        res.writeHead(201, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ message: 'Todo added successfully' }));

      } catch (err) {
        console.error('[ERROR] Error parsing JSON body:', err);
        res.writeHead(400, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: 'Invalid JSON format' }));
      }
    });

    return;
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Not Found' }));
});

server.listen(port, async () => {
  await initDb();
  console.log(`Todo backend server is running on port ${port}`);
});

