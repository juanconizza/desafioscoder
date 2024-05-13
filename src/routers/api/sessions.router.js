import { Router } from "express";
import userManager from "../../data/mongo/managers/UsersManager.mongo.js";
import validateUsersProps from "../../middlewares/validateUsersProps.js";
import isValidEmail from "../../middlewares/isValidEmail.js";

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
  

export default sessionRouter;
