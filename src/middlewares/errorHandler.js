function errorHandler(error, req, res, next) {
  if (res.headersSent) {
    return next(error);
  }
  
  const statusCode = error.statusCode || 500;
  const errorMessage = error.message || "Internal Server Error";
  const errors = error.errors || {};

  res.status(statusCode).json({ error: errorMessage, errors: errors });
}

export default errorHandler;
