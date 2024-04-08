import express from "express";
import { engine } from "express-handlebars";
import router from "./src/routers/index.router.js";
import errorHandler from "./src/middlewares/errorHandler.js";
import pathHandler from "./src/middlewares/pathHandler.js";
import morgan from "morgan";
import __dirname from "./utils.js";
import { join } from "path";

const app = express();
const port = 8080;

//Configuramos el motor de plantillas de handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/src/views");

//Carpeta Public de Imagenes
app.use(express.static(join(__dirname, "public/img")));

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
app.use(pathHandler);
