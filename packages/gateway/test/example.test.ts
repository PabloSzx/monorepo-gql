import { app } from "../src/index";
import { createMercuriusTestClient } from "mercurius-integration-testing";

import { HelloGatewayDocument } from "../graphql/generated/hello";

it("works", () => {
  const client = createMercuriusTestClient(app);

  const response = client.query(HelloGatewayDocument, {});

  response.then(({ data }) => {
    expect(data.hello).toBe("world");
  });
});
