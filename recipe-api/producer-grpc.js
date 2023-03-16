const loader = require("@grpc/proto-loader");
const grpc = require("@grpc/grpc-js");
const pkg_def = loader.loadSync(__dirname + "/../shared/grpc-recipe.proto");

const recipe = grpc.loadPackageDefinition(pkg_def).recipe;

const HOST = process.env.HOST || "127.0.0.1";
const PORT = process.env.PORT || 4000;

const server = new grpc.Server();
server.addService(recipe.RecipeService.service, {
  getMetaData: (call, cb) => {
    cb(null, {
      pid: process.id,
    });
  },
  GetRecipe: (call, cb) => {
    if (call.request.id !== 42) {
      return cb(new Error("recipe not registered"));
    }
    cb(null, {
      id: 42,
      name: "chk tika masala",
      steps: "throw all in pot",
      ingredients: [
        { id: 1, name: "chicken", qty: "1lb" },
        { id: 2, name: "sauce", qty: "2 cups" },
      ],
    });
  },
});

server.bindAsync(
  `${HOST}:${PORT}`,
  grpc.ServerCredentials.createInsecure(),
  (err, port) => {
    if (err) throw err;
    server.start();
    console.log(`Producer running at http://${HOST}:${port}/`);
  }
);
