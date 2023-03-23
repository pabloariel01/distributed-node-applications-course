const { Pool } = require("pg");
const db = new Pool({
  host: "localhost",
  port: 5432,
  user: "user",
  password: "hunter2",
  database: "dbconn",
  max: process.env.MAX_CONN || 10, //101 would make postgress fail
});
db.connect();
const server = require('fastify')();
server.get('/', async () => (
  await db.query("SELECT NOW() AS time, 'world' AS hello")).rows[0]);
server.listen(3000, () => console.log(`http://localhost:3000`));