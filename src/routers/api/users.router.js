import { Router } from "express";
import userManager  from "../../../src/data/fs/UserManager.js";
import errorHandler from "../../middlewares/errorHandler.js";
import express from "express";

const app = express();

const userRouter = Router();



// Endpoint para obtener todos los usuarios y filtro query por rol
app.get("/", async (req, res) => {
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
    return errorHandler(error, req, res);
  }
});

// Endpoint para obtener un usuario por su ID
app.get("/:uid", async (req, res) => {
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
    return errorHandler(error, req, res);
  }
});

export default userRouter;
