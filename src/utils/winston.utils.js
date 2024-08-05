import { createLogger, format, addColors, transports } from "winston";
import argsUtil from "../utils/args.js";

const { combine, timestamp, printf, colorize } = format;
const { Console, File } = transports;

const levels = { FATAL: 0, ERROR: 1, INFO: 2, HTTP: 3 };
const colors = { FATAL: "red", ERROR: "yellow", INFO: "blue", HTTP: "white" };
addColors(colors);

// Custom log format
const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

const loggerTransports = [];

loggerTransports.push(new Console({ level: "HTTP", format: combine(colorize(), timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), logFormat) }));

//Acá condicionamos que si estamos en ambiente de producción el logger utilice el archivo para guardar los errores.
if (argsUtil.env === "prod") {
  loggerTransports.push(new File({
    level: "ERROR",
    filename: "./src/utils/errors/errors.log",
    handleExceptions: true,
    format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), logFormat)
  }));
}

const logger = createLogger({
  levels,
  format: combine(colorize(), timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), logFormat),
  transports: loggerTransports
});

export default logger;
