//producer

const server = require("fastify");
const app = server();
const graphql = require("fastify-gql");
const fs = require("fs");

const schema = fs
  .readFileSync(__dirname + "/../shared/graphql-schema.gql")
  .toString();
const HOST = process.env.HOST || "127.0.0.1";
const PORT = process.env.PORT || 4000;

const resolvers = {
  Query: {
    pid: () => process.pid,
    recipe: async (_obj, { id }) => {
      if (id != 42) throw new Error("recipe not found");
      return {
        id,
        name: "chicken tika masala",
        steps: "throw all in pot",
      };
    },
  },
  Recipe: {
    ingredients: async (obj) => {
      return obj.id
        ? []
        : [
            { id: 1, name: "Chicken", quantity: "1 lb" },
            { id: 2, name: "Sauce", quantity: "2 cups" },
          ];
    },
  },
};

app.register(graphql, { schema, resolvers, graphiql: true });

app.listen({
  port: PORT,
  host: HOST,

  },() => {
    console.log(`Producer running at http://${HOST}:${PORT}/graphql`);
});
