const basicController = require("./controllers/basicController");
const advancedController = require("./controllers/advancedController");
const express = require("express");
const app = express();
const port = 3000;

const winston = require("winston");
const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "calculator-microservice" },
  transports: [
    new winston.transports.Console({ format: winston.format.simple() }),
    new winston.transports.File({ filename: "logs/error.log", level: "error" }),
    new winston.transports.File({ filename: "logs/combined.log" }),
  ],
});
global.logger = logger;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello, node!");
});

app.get("/add", basicController.add);
app.get("/subtract", basicController.subtract);
app.get("/multiply", basicController.multiply);
app.get("/divide", basicController.divide);

app.get("/power", advancedController.power);
app.get("/sqrt", advancedController.sqrt);
app.get("/mod", advancedController.mod);

app.listen(port, () => {
  console.log(`Calculator app is running at http://localhost:${port}`);
});
