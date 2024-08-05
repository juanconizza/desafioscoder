import __dirname from "../../pathhandler.js";

const swaggerOptions = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "MANANTIALES MARKET",
      description: "Documentación de la API de Manantiales Market",
    },
  },
  apis: [__dirname + "/src/docs/*.yaml"],
};

export default swaggerOptions;