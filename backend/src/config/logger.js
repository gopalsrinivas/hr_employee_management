const fs = require("fs");
const path = require("path");
const winston = require("winston");
const env = require("./env");

const logDirectory = path.resolve(__dirname, "..", "logs");

if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory, { recursive: true });
}

const formatter = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.errors({ stack: true }),
  winston.format.json()
);

const logger = winston.createLogger({
  level: env.logLevel,
  format: formatter,
  defaultMeta: { service: "hr-employee-management-api" },
  transports: [
    new winston.transports.File({
      filename: path.join(logDirectory, "error.log"),
      level: "error"
    }),
    new winston.transports.File({
      filename: path.join(logDirectory, "application.log")
    })
  ]
});

if (env.nodeEnv !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize(), winston.format.simple())
    })
  );
}

module.exports = logger;
