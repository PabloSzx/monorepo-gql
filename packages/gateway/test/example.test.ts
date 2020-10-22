import { app as AuthService } from "auth";
import { createMercuriusTestClient } from "mercurius-integration-testing";
import waitOn from "wait-on";

import { HelloGatewayDocument } from "../src/generated/hello";
import { app, registerMercurius } from "../src/index";

beforeAll(async () => {
  await AuthService.listen(4001);
  await waitOn({
    resources: ["tcp:4001"]
  });
  await registerMercurius();
});

afterAll(async () => {
  await AuthService.close();
});

describe("gateway", () => {
  it("service alone", async () => {
    const client = createMercuriusTestClient(AuthService);

    const response = await client.query(HelloGatewayDocument, {
      variables: {}
    });

    expect(response).toEqual({
      data: {
        hello: "world",
        humans: []
      }
    });
  });
  it("works", async () => {
    const client = createMercuriusTestClient(app);

    const response = await client.query(HelloGatewayDocument, {
      variables: {}
    });

    expect(response).toEqual({
      data: {
        hello: "world",
        humans: []
      }
    });
  });
});
