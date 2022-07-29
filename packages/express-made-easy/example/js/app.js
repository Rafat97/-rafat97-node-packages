const { ExpressApplication } = require("../../lib/index");

const option = {
  logDir: `${__dirname}/extra/logs/`,
};

const expressApp = new ExpressApplication(option)
  .addDefaultMiddleware()
  .getMethod("/", async (req, res) => {
    return res.send("Hello World!");
  })
  .getMethod("/err/1", (req, res) => {
    throw new Error("Error");
    return res.send("Hello World!");
  })
  .getMethod("/err/2", async (req, res) => {
    throw new Error("Async Error");
    return res.send("Hello World!");
  })
  .addErrorHandler((err, req, res, next) => {
    console.log(err);
    return res.send("error");
  })
  .startServerSync();
