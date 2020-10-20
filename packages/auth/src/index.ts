import Fastify from "fastify";
import { Resolvers } from "graphql-gen";
import mercurius, { MercuriusSchemaOptions } from "mercurius";
import { resolve } from "path";

import { loadFiles } from "@graphql-tools/load-files";

const typeDefs = loadFiles(resolve(__dirname, "../graphql"), {}).then((v) => v.toString());

typeDefs
  .then((typeDefs) => {
    const resolvers: Resolvers = {
      Query: {
        hello: (_root, _args, _ctx, _info) => {
          return "hello";
        }
      },
      Human: {
        name(root) {
          return root.id;
        },

        __resolveReference: async (_a, _b, _c) => {
          return {
            id: "",
            name: ""
          };
        }
      }
    };

    const loaders: MercuriusSchemaOptions["loaders"] = {
      Human: {}
    };

    const app = Fastify({
      logger: {
        level: "error"
      }
    });

    app.register(mercurius, {
      schema: typeDefs,
      resolvers: resolvers,
      loaders: loaders,
      federationMetadata: true
    });

    app.listen(4001);
  })
  .catch(console.error);
