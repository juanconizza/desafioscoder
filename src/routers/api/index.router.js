import { Router } from "express";
import userRouter from "./users.router.js";
import productRouter from "./products.router.js";

const apiRouter = Router()

apiRouter.use("/users", userRouter)
apiRouter.use("/products", productRouter)

export default apiRouter