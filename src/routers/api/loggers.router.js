import CustomRouter from "../CustomRouter.js";
import logger from "../../utils/winston.utils.js";

class LoggerRouter extends CustomRouter {
    init() {
      this.read("/", ["PUBLIC"], (req, res) => {
        req.logger = logger;
        req.logger.FATAL("Este es un mensaje de log FATAL");
        req.logger.ERROR("Este es un mensaje de log ERROR");
        req.logger.INFO("Este es un mensaje de log INFO");
        req.logger.HTTP("Este es un mensaje de log HTTP");
      
        res.send("Logs generados. Verifique la consola y el archivo de logs.");
      });
      
    }
  }
  
  const loggersRouter = new LoggerRouter();
  
  export default loggersRouter.getRouter();