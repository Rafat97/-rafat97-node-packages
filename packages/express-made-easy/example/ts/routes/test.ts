import { ExpressApplicationRouter } from "../../../src/index";

export const routerTest = new ExpressApplicationRouter().getMethod(
  "/",
  (req, res, next) => {
    res.render("index", { title: "Express" });
  }
);
