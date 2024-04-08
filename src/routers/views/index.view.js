import { Router } from "express";

const viewsRouter = Router();

viewsRouter.get("/", (req, res, next) => {
   try {
     return res.render("index", { title: "HOME" });
   } catch (error) {
     return next(error);
   }
 });

export default viewsRouter;
