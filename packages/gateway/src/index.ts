import Fastify from "fastify";
import mercurius from "mercurius";
import AltairFastifyPlugin from "altair-fastify-plugin";

const app = Fastify({
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

setInterval(async () => {
  //@ts-expect-error
  const schema = await app.graphql.gateway.refresh().catch((err) => {
    app.log.error(JSON.stringify(err));
  });

  if (schema != null) {
    app.log.info("Schema refreshed");
    app.graphql.replaceSchema(schema);
  }
}, 5000);

app.listen(4000).catch(console.error);
