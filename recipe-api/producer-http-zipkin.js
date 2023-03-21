const server = require("fastify")();
const HOST = process.env.HOST || "127.0.0.1";
const PORT = process.env.PORT || 4000;
const ZIPKIN = process.env.ZIPKIN || 'localhost:9411';
const Zipkin = require('zipkin-lite');
const zipkin = new Zipkin({
  zipkinHost: ZIPKIN,
  serviceName: 'recipe-api', servicePort: PORT, serviceIp: HOST,
});
server.addHook('onRequest', zipkin.onRequest());
server.addHook('onResponse', zipkin.onResponse());

console.log(`worker pid = ${process.pid}`);

server.get("/recipes/:id", async (req, reply) => {
  req.zipkin.setName('get_recipe')
  console.log(`worker request id = ${process.pid}`);
  const id = Number(req.params.id);
  if (id !== 42) {
    reply.statusCode = 404;
    return { error: "not_found" };
  }

  return {
    producer_pid: process.pid,
    recipe: {
      id,
      name: "chicken tika masala",
      steps: "Throw it in a pot...",
      ingredients: [
        { id: 1, name: "chicken", qty: "1 lb" },
        { id: 2, name: "sauce", qty: "2 cups" },
      ],
    },
  };
});

server.listen(PORT, HOST, () => {
  console.log(`Producer running at http://${HOST}:${PORT}`);
});
