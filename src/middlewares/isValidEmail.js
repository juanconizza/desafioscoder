import userManager from "../data/mongo/managers/UsersManager.mongo.js";

async function isValidEmail(req, res, next) {
  try {
    const { email } = req.body;
    const one = await userManager.readByEmail(email);
   
    if (one) {
      const error = new Error("Email already registered! Use another one");
      error.statusCode = 401;
      error.errors = { email: "El email ingresado ya fue registrado, utilice otro" };
      throw error;
    }
    return next();
  } catch (error) {
    return next(error);
  }
}

export default isValidEmail;



