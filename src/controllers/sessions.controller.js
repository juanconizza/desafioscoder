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
      // Opciones para la cookie
      const cookieOptions = {
        httpOnly: true,          
        signed: true  
      };  
      return res
        .cookie("token", req.user.token, cookieOptions)
        .status(200)
        .json({ message: "Logged in!" });
    } catch (error) {
      return next(error);
    }
  };

  auth = async (req, res, next) => {
    try {          
      // Verificar si el usuario está en línea
      if (req.user.online) {
        return res.json({
          statusCode: 200,
          message: "Is Online!",
          user_id: req.user._id,
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
