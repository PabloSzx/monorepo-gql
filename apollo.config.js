const path = require("path");
module.exports = {
  client: {
    service: {
      name: "app",
      localSchemaFile: path.resolve(__dirname, "./schema.gql"),
      endpoint: null
    },
    includes: ["packages/**/operations/*.gql"]
  }
};
