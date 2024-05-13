import { Router } from "express";
import userManager from "../../data/mongo/managers/UsersManager.mongo.js";
import validateUsersProps from "../../middlewares/validateUsersProps.js";
import isValidEmail from "../../middlewares/isValidEmail.js";
import isValidUser from "../../middlewares/isValidUser.js";
import isValidPass from "../../middlewares/isValidPass.js";
import session from "express-session";
 

const sessionRouter = new Router();

sessionRouter.post(
    "/register",
    validateUsersProps,
    isValidEmail,
    async (req, res, next) => { 
      try {
        const data = req.body; // Obtener los datos del cuerpo de la solicitud
  
        // Crear el usuario utilizando el método create(data) del UserManager
        const newUser = await userManager.create(data);
  
        // Enviar una respuesta con el nuevo usuario creado
        res.status(201).json({
          statusCode: 201,
          response: newUser.id,
          message: "User created successfully!",
        });
        
      } catch (error) {
        return next(error);
      }
    }
  );
  
  sessionRouter.post(
    "/login",
    isValidUser,
    isValidPass,
    async (req, res, next) => { 
      try {
        const { email } = req.body;
        const user = await userManager.readByEmail(email);
        
        // Establecer variables de sesión
        req.session.email = email;
        req.session.online = true;
        req.session.role = user.role;
        req.session.user_id = user._id;
        
        // Enviar respuesta con el ID de usuario
        return res.json({ 
          statusCode: 200, 
          message: "Logged in!",
          user_id: user._id // Aquí se incluye el ID de usuario en la respuesta
        });
      } catch (error) {
        return next(error);
      }
    }
  );
  

export default sessionRouter;
