// for init
// wsl -d docker-desktop
// sysctl -w vm.max_map_count=262144
// docker run -p 5601:5601 -p 9200:9200 -p 5044:5044 -p 7777:7777/udp -v C:\Users\psilva\Documents\proyectos\distributed-node\misc\elk\udp.conf:/etc/logstash/conf.d/99-input-udp.conf -it --name distnode-elk sebp/elk:683

// $ NODE_ENV=development LOGSTASH=localhost:7777 \
//   node web-api/consumer-http-logs.js
// $ node recipe-api/producer-http-basic.js
// $ brew install watch # required for macOS
// $ watch -n5 curl http://localhost:3000
// $ watch -n13 curl http://localhost:3000/error

const server = require("fastify")();
const fetch = require("node-fetch");
const HOST = process.env.HOST || "127.0.0.1";
const PORT = process.env.PORT || 3000;
const TARGET = process.env.TARGET || "localhost:4000";
const log = require("./logstash.js");
(async () => {
  await server.register(require("middie"));

  server.use((req, res, next) => {
    log("info", "request-incoming", {
      path: req.url,
      method: req.method,
      ip: req.ip,
      ua: req.headers["user-agent"] || null,
    });
    next();
  });

  server.setErrorHandler(async (error, req) => {
    log("error", "request-failure", {
      stack: error.stack,
      path: error.url,
      method: req.method,
    });
    return { error: error.message };
  });

  server.get("/", async () => {
    const req = await fetch(`http://${TARGET}/recipes/42`);
    const producer_data = await req.json();

    return {
      consumer_pid: process.pid,
      producer_data,
    };
  });

  server.get("/error", async () => {
    throw new Error("error!!");
  });
  server.listen(PORT, HOST, () => {
    console.log(`Consumer running at http://${HOST}:${PORT}/`);
  });
})();
