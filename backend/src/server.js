const app = require("./app");
const env = require("./config/env");
const logger = require("./config/logger");
const { sequelize } = require("./models");

const startServer = async () => {
  try {
    await sequelize.authenticate();
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
