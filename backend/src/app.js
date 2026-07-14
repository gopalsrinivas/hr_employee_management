const express = require("express");
const path = require("path");
const cors = require("cors");
const helmet = require("helmet");
const swaggerUi = require("swagger-ui-express");
const env = require("./config/env");
const routes = require("./routes");
const swaggerSpec = require("./swagger");
const requestContext = require("./middlewares/requestContext");
const requestLogger = require("./middlewares/requestLogger");
const notFoundHandler = require("./middlewares/notFoundHandler");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: env.corsOrigin,
    credentials: true
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestContext);
app.use(requestLogger);
app.use("/uploads", express.static(path.resolve(process.cwd(), env.uploadPath)));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api", routes);
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
