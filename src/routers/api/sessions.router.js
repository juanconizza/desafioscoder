import CustomRouter from "../CustomRouter.js";
import passport from "../../middlewares/passport.js";

class SessionRouter extends CustomRouter {
  init() {
    this.create(
      "/register",
      ["PUBLIC"],
      passport.authenticate("register"),
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

    this.create(
      "/login",
      ["PUBLIC"],
      passport.authenticate("login"),
      async (req, res, next) => {
        try {
          console.log("paso passport!")
          console.log(req)                          
          // Enviar respuesta con el ID de usuario
          return res            
            .cookie("token", req.user.token, { signedCookie: true })
            .response200("Logged in!");            
        } catch (error) {
          return next(error);
        }
      }
    );

    this.read(
      "/",
      ["USER"],
      passport.authenticate("jwt"),
      async (req, res, next) => {
        try {
          if (req.user.online) {
            // El usuario ha iniciado sesión y req.user.online está definido
            return res.json({
              statusCode: 200,
              message: "Is Online!",
              user_id: req.user.user_id,
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
      }
    );

    this.create("/logout", ["USER"], (req, res, next) => {
      try {
        req.user.online = false;
        req.user.destroy();
        return res.json({ statusCode: 200, message: "Signed out!" });
      } catch (error) {
        return next(error);
      }
    });
  }
}

const sessionRouter = new SessionRouter();

export default sessionRouter.getRouter();
