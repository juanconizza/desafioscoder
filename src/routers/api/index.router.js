import { Router } from "express";
import userRouter from "./users.router.js";
import productRouter from "./products.router.js";
import cartContact from "./cartContact.router.js";

const apiRouter = Router();

apiRouter.use("/users", userRouter);
apiRouter.use("/products", productRouter);
apiRouter.use("/cart-contact", cartContact);

export default apiRouter;
