const swaggerJsdoc = require("swagger-jsdoc");
const env = require("../config/env");

const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: `${env.appName} API`,
      version: "1.0.0",
      description: "Part 1 authentication API documentation."
    },
    servers: [
      {
        url: `http://localhost:${env.port}`
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    }
  },
  apis: ["./src/swagger/*.js"]
});

module.exports = swaggerSpec;
