const { ExpressApplication } = require("../../lib/index");

const option = {
  logDir: `${__dirname}/extra/logs/`,
};

const expressApp = new ExpressApplication(option)
  .addDefaultMiddleware()
  .getMethod("/", (req, res) => {
    res.send("Hello World!");
  })
  .startServerSync();
