import { ExpressApplication } from "../src/index";

describe("ExpressApplication", () => {
  it("Create Sync table", async () => {
    const app = new ExpressApplication();
    console.log(app);
    // const table = await app.createSyncTable();
    // expect(table).toBeDefined();
  });
});
