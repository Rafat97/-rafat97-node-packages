import { ExpressApplicationRouter } from "../../../src/index";

const dataM = (req: any, res: any, next: any) => {
  console.log("dataM");
  next();
};

const routerErr = new ExpressApplicationRouter()
  .getMethod("/1", dataM, dataM, dataM, (req, res, next) => {
    throw new Error("Error message");
    return res.send("Hello World! routerAPI");
  })
  .getMethod("/2", dataM, dataM, dataM, async (req, res, next) => {
    throw new Error("Async Error message");
    return res.send("Hello World! routerAPI");
  });

export default routerErr;
