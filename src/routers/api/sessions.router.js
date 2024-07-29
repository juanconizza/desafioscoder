import CustomRouter from "../CustomRouter.js";
import passport from "../../middlewares/passport.js";
import {
  register,
  login,
  auth,
  logout,
  resetPassword,
  changePassword,
} from "../../controllers/sessions.controller.js";

class SessionRouter extends CustomRouter {
  init() {
    this.create(
      "/register",
      ["PUBLIC"],
      passport.authenticate("register", { session: false }),
      register
    );

    this.create(
      "/login",
      ["PUBLIC"],
      passport.authenticate("login", { session: false }),
      login
    );

    this.read("/", ["USER"], auth);

    this.create("/password", ["PUBLIC"], resetPassword);
    this.update("/password", ["PUBLIC"], changePassword);

    this.create("/logout", ["USER"], logout);
  }
}

const sessionRouter = new SessionRouter();

export default sessionRouter.getRouter();
