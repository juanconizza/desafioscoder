import { createHash } from "../services/hash.js"

function createHashPassword(req, res, next) {
  try {
    const { password } = req.body;
    const hashPassword = createHash(password);
    req.body.password = hashPassword;
    return next();
  } catch (error) {
    return next(error);
  }
}

export default createHashPassword;