const DatabaseReconnection = require("./db.js");
const db = new DatabaseReconnection({
  host: "localhost",
  port: 5432,
  database: "dbconn",
  user: "user",
  password: "hunter2",
  retry: 1_000,
});

db.connect();
db.on("error", (err) => console.error("db error", err.message));
db.on("reconnect", () => console.log("reconnecting..."));
db.on("connect", () => console.log("connected."));
db.on("disconnect", () => console.log("disconnected."));

const server = require('fastify')();
server.get("/foo/:foo_id", async (req, reply) => {
  try {
    var res = await db.query("SELECT NOW() AS TIME, $1 AS echo", [
      req.params.foo_id,
    ]);
    console.log(res);
  } catch (e) {
    reply.statuscode = 503;
    return e;
  }
  return res.rows[0];
});

server.get("/health", async (req, reply) => {

  if (!db.connected) {
    throw new Error("no db connection");
  }
  return "OK";
});
server.listen(3000, () => console.log(`http://localhost:3000`));
