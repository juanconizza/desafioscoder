import environment from "./src/utils/env.utils.js";
import compression from "express-compression";
import argsUtil from "./src/utils/args.js";
import express from "express";
import dbConnection from "./src/utils/db.js";
import { engine } from "express-handlebars";
import { createServer } from "http";
import { Server } from "socket.io";
import cookieParser from "cookie-parser";
import socketCb from "./src/routers/index.socket.js";
import router from "./src/routers/index.router.js";
import swaggerOptions from "./src/utils/swagger.utils.js";
import swaggerJSDoc from "swagger-jsdoc";
import { serve, setup } from "swagger-ui-express";

import errorHandler from "./src/middlewares/errorHandler.js";
import pathHandler from "./src/middlewares/pathHandler.js";
//import morgan from "morgan";
import winston from "./src/middlewares/winston.js";
import __dirname from "./pathhandler.js"
import { join } from "path";

const app = express();
const port = environment.PORT || argsUtil.p;
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
app.use(cookieParser(environment.SECRET_COOKIE));

//Carpeta Public de Imagenes
app.use(express.static(join(__dirname, "public/img")));

// Inicializamos Morgan
//©app.use(morgan("dev"));

// Configuraciónde Middleware de Swagger para el endpoint correspondiente. 
const specs = swaggerJSDoc(swaggerOptions);

// Middleware para comprimir y mejorar la transferencia del servidor
app.use(
  compression({
  brotli: { enabled: true, zlib: {} },
  })
  );

// Endpoint de Swagger con la documentación.
app.use("/api/docs", serve, setup(specs));

// Middleware para manejar JSON
app.use(express.json());

// Este middleware de Express analiza los cuerpos de las solicitudes entrantes en un formulario codificado en URL y los coloca en req.body.
app.use(express.urlencoded({ extended: true }));

//Middleware de Winston para usar un custom log
app.use(winston);

// Middleware para usar el enturador y obligar al servidor a usar las rutas con "/"
app.use("/", router);

// Middleware para el manejo de errores.
app.use(errorHandler);

// Middleware para el manejo de rutas desconocidas.
app.use(pathHandler);
