import express from "express";
import router from "./src/routers/index.router.js";
import errorHandler from "./src/middlewares/errorHandler.js";
import pathHandler from "./src/middlewares/pathHandler.js";
import validateProductsProps from "./src/middlewares/validateProductsProps.js";
import validateUsersProps from "./src/middlewares/validateUsersProps.js";
import morgan from "morgan";


const app = express();
const port = 8080;

// Inicializamos Morgan
app.use(morgan("dev"));

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Middleware para manejar JSON
app.use(express.json());

// Este middleware de Express analiza los cuerpos de las solicitudes entrantes en un formulario codificado en URL y los coloca en req.body.
app.use(express.urlencoded({ extended: true }));

// Middleware para usar el enturador y obligar al servidor a usar las rutas con "/"
app.use("/", router);

// Middleware para el manejo de errores.
app.use(errorHandler);

// Middleware para el manejo de rutas desconocidas.
app.use(pathHandler)

// Middleware para validación de propiedades obligatorias y por defecto en los productos.
app.use(validateProductsProps)

// Middleware para validación de propiedades obligatorias y por defecto en los usuarios.
app.use(validateUsersProps)




