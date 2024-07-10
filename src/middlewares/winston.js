import log from "../utils/winston.utils.js";

function winston(req, res, next) {
  req.logger = log;
  const message = `${req.method} ${req.originalUrl}`;
  req.logger.HTTP(message);
  return next();
}

export default winston;
