import Fastify from "fastify";
import mercurius from "mercurius";

const schema = `
type Query {
    hello: String!
}
`;

const resolvers = {
  Query: {
    hello: () => "world",
  },
};

const app = Fastify({
  logger: {
    level: "info",
  },
});

app.register(mercurius, {
  schema,
  resolvers,
});

app.listen(3000);
