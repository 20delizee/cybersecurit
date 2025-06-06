const swaggerJsdoc = require("swagger-jsdoc");

const swaggerSpec = swaggerJsdoc({
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "CyberGuardian API",
      version: "1.0.0",
    },
  },
  apis: ["./routes/*.js"],
});

module.exports = { swaggerSpec };