import Fastify from "fastify";
import mercurius from "mercurius";
import AltairFastifyPlugin from "altair-fastify-plugin";
import { printSchema } from "graphql";
import { promisify } from "util";
import fs from "fs";
import { resolve } from "path";

const writeFile = promisify(fs.writeFile);

export const app = Fastify({
  logger: {
    level: "info"
  }
});

app.register(mercurius, {
  gateway: {
    services: [
      {
        name: "user",
        url: "http://localhost:4001/graphql",
        mandatory: true
      }
    ]
  },
  jit: 1
});

app.register(AltairFastifyPlugin, {});

function writeSchemaToFile() {
  setImmediate(() => {
    writeFile(resolve(__dirname, "../../../schema.gql"), printSchema(app.graphql.schema), {
      encoding: "utf-8"
    }).catch(console.error);
  });
}

setInterval(async () => {
  //@ts-expect-error
  const schema = await app.graphql.gateway.refresh().catch((err) => {
    if (
      Array.isArray(err.errors) ? err.errors.every((v: { code: string }) => v.code !== "ECONNRESET") : true
    ) {
      app.log.error(JSON.stringify(err));
    }
  });

  if (schema != null) {
    app.log.info("Schema refreshed");
    app.graphql.replaceSchema(schema);

    writeSchemaToFile();
  }
}, 5000);

if (process.env.NODE_ENV !== "test")
  app
    .listen(4000)
    .then(() => {
      writeSchemaToFile();
    })
    .catch(console.error);
