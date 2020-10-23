import { IS_TEST } from "common";
import Fastify from "fastify";
import { Resolvers } from "graphql-gen";
import mercurius, { MercuriusSchemaOptions } from "mercurius";
import { join, resolve } from "path";

import { loadFilesSync } from "@graphql-tools/load-files";

const schema = loadFilesSync(join(resolve(__dirname, "../graphql"), "schema/*.gql"), {}).toString();

export const app = Fastify({
  logger: IS_TEST
    ? false
    : {
        level: "info"
      }
});

const resolvers: Resolvers = {
  Query: {
    hello: (_root, _args, _ctx, _info) => {
      console.log("resolver query hello");
      return "world";
    },
    humans: () => []
  },
  Human: {}
};

const loaders: MercuriusSchemaOptions["loaders"] = {
  Human: {}
};

app.register(mercurius, {
  schema,
  resolvers: resolvers as {},
  loaders: loaders,
  federationMetadata: true,
  subscription: true
});

if (!IS_TEST) {
  app.listen(4001);
}
