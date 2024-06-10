import CustomRouter from "./CustomRouter.js";
import apiRouter from "./api/index.router.js";
import viewsRouter from "./views/index.view.js";

class IndexRouter extends CustomRouter {
  init() {
    this.use("/api", apiRouter);
    this.use("/", viewsRouter);
  }
}

const indexRouter = new IndexRouter();

export default indexRouter.getRouter();
