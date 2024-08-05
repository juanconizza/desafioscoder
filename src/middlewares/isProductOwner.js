import { verifyToken } from "../utils/token.js";

function isProductOwner(req, res, next) {
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

        // Verifica si el token tiene la propiedad user_id
        if (!decodedToken || !decodedToken.user_id) {
            return res.status(401).json({
                statusCode: 401,
                message: "Unauthorized: Invalid token",
            });
        }

        // Agrega la propiedad seller_id al objeto data
        req.body.seller_id = decodedToken.user_id;

        next();
    } catch (error) {
        return res.status(500).json({
            statusCode: 500,
            message: "Internal Server Error",
        });
    }
}

export default isProductOwner;
