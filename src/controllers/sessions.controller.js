import { signedCookie } from "cookie-parser";

class SessionsController {
  register = async (req, res, next) => {
    try {
      res.status(201).json({
        statusCode: 201,
        message: "User created successfully!",
      });
    } catch (error) {
      return next(error);
    }
  };

  login = async (req, res, next) => {
    try {    
      if (!req.user || !req.user.token) {
        return res.status(401).json({ message: "Authentication failed" });
      }  
      return res
        .cookie("token", req.user.token, { signedCookie: true })
        .status(200)
        .json({ message: "Logged in!" });
    } catch (error) {     
      return next(error);
    }
  };

  auth = async (req, res, next) => {
    try {      
      if (req.user.online) {
        return res.json({
          statusCode: 200,
          message: "Is Online!",
          user_id: req.user.user_id,
        });
      } else {
        return res.json({
          statusCode: 401,
          message: "Not Online!",
        });
      }
    } catch (error) {
      return next(error);
    }
  };

  logout = async (req, res, next) => {
    try {
      req.user.online = false;
      res.clearCookie("token", { signed: true });
      return res.json({ statusCode: 200, message: "Signed out!" });
    } catch (error) {
      return next(error);
    }
  };
}

const sessionsController = new SessionsController();
const { register, login, auth, logout } = sessionsController;
export { register, login, auth, logout };
