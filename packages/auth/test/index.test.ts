import { createMercuriusTestClient } from "mercurius-integration-testing";

import { HelloDocument } from "../src/generated/example";
import { app } from "../src/index";

describe("hello", () => {
  it("works", async () => {
    const client = createMercuriusTestClient(app);

    const response = await client.query(HelloDocument, {
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
