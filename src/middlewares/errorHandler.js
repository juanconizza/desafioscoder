import log from "../utils/winston.utils.js";

function errorHandler(error, req, res, next) {
  if (res.headersSent) {
    return next(error);
  }

  const statusCode = error.statusCode || 500;
  const errorMessage = error.message || "Internal Server Error";
  const errors = error.errors || {};

  // Log the error
  req.logger = log;
  req.logger.ERROR(`${statusCode} - ${errorMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`);

  res.status(statusCode).json({ error: errorMessage, errors: errors });
}

export default errorHandler;
