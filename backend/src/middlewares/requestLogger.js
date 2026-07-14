const logger = require("../config/logger");

const requestLogger = (req, res, next) => {
  const startedAt = Date.now();

  res.on("finish", () => {
    logger.info("API request completed", {
      requestId: req.requestId,
      method: req.method,
      url: req.originalUrl,
      statusCode: res.statusCode,
      durationMs: Date.now() - startedAt,
      userId: req.user ? req.user.id : null,
      ip: req.ip
    });
  });

  next();
};

module.exports = requestLogger;
