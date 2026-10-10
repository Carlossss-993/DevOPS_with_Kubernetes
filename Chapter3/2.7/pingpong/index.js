const http = require('http');
const pg = require('pg');

const port = process.env.PORT || 3000;
const dbConfig = {
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
};

const createTableQuery = `
  CREATE TABLE IF NOT EXISTS pingpong_counter (
    id SERIAL PRIMARY KEY,
    count INTEGER NOT NULL
  );
`;

const insertInitialCountQuery = `
  INSERT INTO pingpong_counter (count)
  VALUES (0)
  ON CONFLICT (id) DO NOTHING;
`;

const getCountQuery = `
  SELECT count FROM pingpong_counter WHERE id = 1;
`;

const updateCountQuery = `
  UPDATE pingpong_counter SET count = count + 1 WHERE id = 1;
`;

const client = new pg.Client(dbConfig);
const startServer = async () => {
  try {
    await client.connect();
    await client.query(createTableQuery);
    await client.query(insertInitialCountQuery);
  } catch (err) {
    console.error('Error connecting to the database:', err);
    process.exit(1);
  }
}

const getCount = async () => {
  try {
    const res = await client.query(getCountQuery);
    return res.rows[0].count;
  } catch (err) {
    console.error('Error getting count from the database:', err);
    return 0;
  }
};

const updateCount = async () => {
  try {
    await client.query(updateCountQuery);
  } catch (err) {
    console.error('Error updating count in the database:', err);
  }
};

const server = http.createServer(async (req, res) => {
  if (req.url === '/pingpong') {
    await updateCount();
    const cont = await getCount();

    res.writeHead(200, { 'Content-Type': 'text/plain' });
    return res.end(`Pong ${cont}`);
  }
  if (req.url === '/pings') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    const cont = await getCount();
    return res.end(cont.toString());
  }

  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Not Found');
});

server.listen(port, async () => {
  await startServer();
  console.log(`Ping-pong escuchando en el puerto ${port}`);
});