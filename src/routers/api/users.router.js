import { Router } from "express";
import { UserManager } from "../../../src/data/fs/UserManager.js";
import validateUsersProps from "../../middlewares/validateUsersProps.js";

const userRouter = Router();
const userManager = new UserManager();

// Endpoint para obtener todos los usuarios y filtro query por rol
userRouter.get("/", async (req, res, next) => {
  try {
    const { role } = req.query; // Obtener el valor del parámetro role de la query

    let users = await userManager.read();

    // Filtrar usuarios por rol si se proporciona el parámetro role
    if (role) {
      users = users.filter((user) => user.role === role);
    }

    // Verificar si hay usuarios después de filtrar
    if (users.length > 0) {
      res.status(200).json({
        statusCode: 200,
        response: users,
      });
    } else {
      res.status(404).json({
        statusCode: 404,
        response: null,
        message: "No users to display",
      });
    }
  } catch (error) {
    return next(error);
  }
});

// Endpoint para obtener un usuario por su ID
userRouter.get("/:uid", async (req, res, next) => {
  try {
    const user = await userManager.readOne(req.params.uid);
    if (!user) {
      res
        .status(404)
        .json({ statusCode: 404, response: null, message: "User not found" });
    } else {
      res.status(200).json({ statusCode: 200, response: user });
    }
  } catch (error) {
    return next(error);
  }
});

// Endpoint POST para crear un nuevo usuario utilizando el middleware de validación.
userRouter.post("/", validateUsersProps, async (req, res, next) => {
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
    // Manejar los errores utilizando el errorHandler
    return next(error);
  }
});

// Endpoint PUT para actualizar un usuario existente
userRouter.put("/:uid", validateUsersProps, async (req, res, next) => {
  try {
    const { uid } = req.params; // Obtener el ID del usuario de los parámetros de la URL
    const data = req.body; // Obtener los datos del cuerpo de la solicitud

    // Actualizar el usuario utilizando el método update(uid, data) del UserManager
    const updatedUser = await userManager.update(uid, data);

    // Enviar una respuesta con el usuario actualizado
    res.status(200).json({
      statusCode: 200,
      response: updatedUser,
    });
  } catch (error) {
    // Manejar los errores utilizando el errorHandler
    return next(error);
  }
});
// Endpoint DELETE para eliminar un usuario existente

userRouter.delete("/:uid", async (req, res, next) => {
  try {
    const { uid } = req.params; // Obtener el ID del usuario de los parámetros de la URL

    // Eliminar el usuario utilizando el método destroy(uid) del UserManager
    const deletedUser = await userManager.destroy(uid);

    // Enviar una respuesta con el usuario eliminado
    if (deletedUser) {
      res.status(200).json({
        statusCode: 200,
        response: deletedUser,
      });
    } else {
      // Si no se pudo eliminar el usuario envía un mensaje de error
      throw new Error(`Failed to delete user with ID ${uid}.`);
    }
  } catch (error) {
    // Manejar los errores utilizando el errorHandler
    return next(error);
  }
});

export default userRouter;
