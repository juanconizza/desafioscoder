import "dotenv/config.js"
import express from "express";
import dbConnection from "./src/utils/db.js";
import { engine } from "express-handlebars";
import { createServer } from "http";
import { Server } from "socket.io";
import cookieParser from "cookie-parser";
import socketCb from "./src/routers/index.socket.js";
import router from "./src/routers/index.router.js";
import errorHandler from "./src/middlewares/errorHandler.js";
import pathHandler from "./src/middlewares/pathHandler.js";
import morgan from "morgan";
import __dirname from "./pathhandler.js"
import { join } from "path";
import { upload } from "./src/middlewares/uploader.js";

const app = express();
const port = process.env.PORT;
// Iniciar el servidor con conexión a Mongodb
const ready = async () => {
  console.log("server ready on port " + port);
  await dbConnection();
};
const nodeServer = createServer(app);
nodeServer.listen(port, ready);

//Iniciamos el servidor TCP
const socketServer = new Server(nodeServer);
socketServer.on("connection", socketCb);

//Configuramos el motor de plantillas de handlebars
app.engine("handlebars", engine({ 
  runtimeOptions: {
  allowedProtoMethods: true,
  allowProtoMethodsByDefault: true,
  allowedProtoProperties: true,
  allowProtoPropertiesByDefault: true}  
}));
  
app.set("view engine", "handlebars");
app.set("views", __dirname + "/src/views");

//Configuración para Cookie con JWT
app.use(cookieParser(process.env.SECRET_COOKIE));

//Carpeta Public de Imagenes
app.use(express.static(join(__dirname, "public/img")));

// Inicializamos Morgan
app.use(morgan("dev"));

// Middleware para manejar JSON
app.use(express.json());

// Este middleware de Express analiza los cuerpos de las solicitudes entrantes en un formulario codificado en URL y los coloca en req.body.
app.use(express.urlencoded({ extended: true }));

// Ruta para procesar el formulario y subir la imagen en carga de producto
app.post("/upload", upload.single("photo"), (req, res) => {
  // Enviar el nombre del archivo como respuesta
  res.send(req.file.filename);
});

// Middleware para usar el enturador y obligar al servidor a usar las rutas con "/"
app.use("/", router);

// Middleware para el manejo de errores.
app.use(errorHandler);

// Middleware para el manejo de rutas desconocidas.
app.use(pathHandler);
