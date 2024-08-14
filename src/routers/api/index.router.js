import CustomRouter from "../CustomRouter.js";
import userRouter from "./users.router.js";
import productRouter from "./products.router.js";
import cartContact from "./cartContact.router.js";
import sessionRouter from "./sessions.router.js";
import ticketRouter from "./ticket.router.js";
import loggersRouter from "./loggers.router.js";
import uploadImage from "./uploadImage.router.js"
import purchaseRouter from "./purchase.router.js"

class ApiRouter extends CustomRouter {
  init() {
    this.use("/users", userRouter);
    this.use("/products", productRouter);
    this.use("/cart-contact", cartContact);
    this.use("/sessions", sessionRouter);
    this.use("/tickets", ticketRouter);
    this.use("/purchase", purchaseRouter);
    this.use("/loggers", loggersRouter);
    this.use("/upload", uploadImage);
  }
}

const apiRouter = new ApiRouter();

export default apiRouter.getRouter();
