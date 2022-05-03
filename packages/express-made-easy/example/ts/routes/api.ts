import { ExpressApplicationRouter } from "../../../src/index";

const dataM = (req: any, res: any, next: any) => {
  console.log("dataM");
  next();
};

const routerAPI = new ExpressApplicationRouter()
  .addMiddleware((req, res, next) => {
    console.log("Middleware A");
    next();
  })
  .getMethod("/", dataM, dataM, dataM, (req, res, next) => {
    // throw new Error("Error message");
    res.send("Hello World! routerAPI");
  });

export default routerAPI;
