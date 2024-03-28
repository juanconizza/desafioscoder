function errorHandler(error, req, res, next) {
  if (res.headersSent) {
    // Si los encabezados ya se enviaron, pasa al siguiente middleware
    return next(error);
  }

  if (error.statusCode) {
    // Si el error tiene un código HTTP específico, responde con ese código y un mensaje de error
    return res.status(error.statusCode).json({ error: error.message });
  } else {
    // Si no hay un código HTTP específico, trata el error como un error interno del servidor (500)
    return res.status(500).json({ error: error.message || "Internal Server Error 500" });
  }
}

export default errorHandler;
