const app = require("./app");
const env = require("./config/env");
const logger = require("./config/logger");
const { sequelize } = require("./models");

const sleep = (ms) => new Promise((resolve) => {
  setTimeout(resolve, ms);
});

const authenticateWithRetry = async () => {
  for (let attempt = 1; attempt <= env.dbConnectRetries; attempt += 1) {
    try {
      await sequelize.authenticate();
      return;
    } catch (error) {
      if (attempt === env.dbConnectRetries) {
        throw error;
      }

      logger.warn("Database connection failed; retrying", {
        attempt,
        retries: env.dbConnectRetries,
        delayMs: env.dbConnectRetryDelayMs,
        message: error.message
      });
      await sleep(env.dbConnectRetryDelayMs);
    }
  }
};

const startServer = async () => {
  try {
    await authenticateWithRetry();
    logger.info("Database connection established");

    app.listen(env.port, () => {
      logger.info(`${env.appName} API running on port ${env.port}`);
    });
  } catch (error) {
    logger.error("Failed to start server", {
      message: error.message,
      stack: error.stack
    });
    process.exit(1);
  }
};

startServer();
