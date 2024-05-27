import userManager from "../data/mongo/managers/UsersManager.mongo.js";


async function isValidPass(req, res, next) {
    try {
      const { email, password } = req.body;
      const one = await userManager.readByEmail(email);
      if (one.password === password) {
        return next();
      }
      const error = new Error("Invalid credentials");
      error.statusCode = 401;
      throw error;
    } catch (error) {
      return next(error);
    }
  }
  
  export default isValidPass;