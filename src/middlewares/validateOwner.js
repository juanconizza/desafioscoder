import { verifyToken } from "../utils/token.js";
import { readOneService } from "../services/products.service.js";

async function validateOwner(req, res, next) {
  try {
    // Verifica si la cookie firmada está presente
    if (!req.signedCookies || !req.signedCookies.token) {
      return res.status(401).json({
        statusCode: 401,
        message: "Unauthorized: No token provided",
      });
    }

    // Decodifica el token
    const decodedToken = verifyToken(req.signedCookies.token);

    // Verifica si el usuario es ADMIN
    if (decodedToken.role === 1) {
      return next(); // Si es ADMIN, omite las verificaciones y sigue
    }

    // Verifica si el token tiene la propiedad user_id
    if (!decodedToken || !decodedToken.user_id) {
      return res.status(401).json({
        statusCode: 401,
        message: "Unauthorized: Invalid token",
      });
    }

    // Obtiene el producto por ID
    const productId = req.params.pid;
    const product = await readOneService(productId);

    // Verifica si el producto existe y si el seller_id coincide con el user_id
    if (!product || product.seller_id.toString() !== decodedToken.user_id) {
      return res.status(403).json({
        statusCode: 403,
        message: "Forbidden: You do not have permission to modify this product",
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
}

export default validateOwner;
