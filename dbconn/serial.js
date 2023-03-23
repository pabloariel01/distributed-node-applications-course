const { Client,Pool } = require('pg');
const db = new Client({
  host: 'localhost', port: 5432,
  user: 'user', password: 'hunter2',
  database: 'dbconn'
});
db.connect();
(async () => {
  const start = Date.now();
  await Promise.all([ 
    db.query("SELECT pg_sleep(2);"),
    db.query("SELECT pg_sleep(2);"),
  ]);
  console.log(`serial took ${(Date.now() - start) / 1000} seconds`);
  db.end();
})();



const dbPool = new Pool({
    host: "localhost",
    port: 5432,
    user: "user",
    password: "hunter2",
    database: "dbconn",
    max: process.env.MAX_CONN || 101,
  });
dbPool.connect();
(async () => {
  const start = Date.now();
  await Promise.all([ 
    dbPool.query("SELECT pg_sleep(2);"),
    dbPool.query("SELECT pg_sleep(2);"),
  ]);
  console.log(`pooled took ${(Date.now() - start) / 1000} seconds`);
  dbPool.end();
})();