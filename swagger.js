const swaggerAutogen = require("swagger-autogen")();
const appConfig = require("./config/app");

const doc = {
  info: {
    title: "My Address Book API",
    description: "An address for all my contacts",
  },
  host: "",
  schemes: ["http", "https"],
  securityDefinitions: {
    Authorization: {
      type: "apikey",
      name: "Authorization",
      in: "header",
      description: "Authorization token (Bearer)",
      example: "Bearer <your token>",
    },
  },
  security: [
    {
      Authorization: [],
    },
  ],
};

const outputFile = "swagger-output.json";
const endpointsFiles = ["./server.js"];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles, doc);
