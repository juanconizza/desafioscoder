import { Router } from "express";
import passport from "../../middlewares/passport.js"

const sessionRouter = new Router();

sessionRouter.post(
  "/register",
  passport.authenticate("register", {session: false}),
  async (req, res, next) => {
    try {
      // Enviar una respuesta con el nuevo usuario creado
      res.status(201).json({
        statusCode: 201,
        message: "User created successfully!",
      });
    } catch (error) {
      return next(error);
    }
  }
);

sessionRouter.post(
  "/login",
  passport.authenticate("login", {session: false}),
    async (req, res, next) => {
    try {
      // Enviar respuesta con el ID de usuario
      return res.json({
        statusCode: 200,
        message: "Logged in!"       
      });
    } catch (error) {
      return next(error);
    }
  }
);

sessionRouter.get("/", async (req, res, next) => {
  try {
    console.log(req.session);
    console.log(req.session.online);
    if (req.session.online) {
      // El usuario ha iniciado sesión y req.session.online está definido
      return res.json({
        statusCode: 200,
        message: "Is Online!",
        user_id: req.session.user_id,
      });
    } else {
      // El usuario no ha iniciado sesión o req.session.online no está definido
      return res.json({
        statusCode: 401,
        message: "Not Online!",
      });
    }    
  } catch (error) {
    return next(error);
  }
});

sessionRouter.post("/logout", (req, res, next) => {
  try {
    req.session.online = false;
    req.session.destroy();
    return res.json({ statusCode: 200, message: "Signed out!" });
  } catch (error) {
    return next(error);
  }
});

export default sessionRouter;
