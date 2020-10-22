import AltairFastifyPlugin from "altair-fastify-plugin";
import Fastify from "fastify";
import fs from "fs";
import { printSchema } from "graphql";
import mercurius from "mercurius";
import { resolve } from "path";
import { promisify } from "util";

const IS_TEST = process.env["NODE_ENV"] === "test";

const writeFile = promisify(fs.writeFile);

export const app = Fastify({
  logger: IS_TEST
    ? false
    : {
        level: "info"
      }
});

export const registerMercurius = async () => {
  await app.register(mercurius, {
    gateway: {
      services: [
        {
          name: "user",
          url: "http://localhost:4001/graphql",
          mandatory: true
        }
      ]
    },

    subscription: true
  });
};

app.register(AltairFastifyPlugin, {});

function writeSchemaToFile() {
  setImmediate(() => {
    writeFile(resolve(__dirname, "../../../schema.gql"), printSchema(app.graphql.schema), {
      encoding: "utf-8"
    }).catch(console.error);
  });
}

if (!IS_TEST) {
  registerMercurius();

  (async () => {
    await app.ready();

    setInterval(async () => {
      //@ts-expect-error
      const schema = await app.graphql.gateway.refresh().catch((err) => {
        if (
          Array.isArray(err.errors)
            ? err.errors.every((v: { code: string }) => v.code !== "ECONNRESET")
            : true
        ) {
          app.log.error(JSON.stringify(err));
        }
      });

      if (schema != null) {
        app.log.info("Schema refreshed");
        app.graphql.replaceSchema(schema);

        writeSchemaToFile();
      }
    }, 25000);
  })();

  app
    .listen(4000)
    .then(() => {
      writeSchemaToFile();
    })
    .catch(console.error);
}
