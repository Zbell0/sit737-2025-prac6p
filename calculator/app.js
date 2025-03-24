const express = require(`express`);
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

app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello, node!");
});

app.get("/add", (req, res) => {
  const { num1, num2 } = req.query;
  const result = parseFloat(num1) + parseFloat(num2);
  const operation = "addition";

  if (isNaN(result)) {
    const errorMsg = "Provide valid numbers";
    logger.error(`${req.ip} - /add - ${errorMsg}`);
    return res.status(400).send({ error: errorMsg });
  }

  logger.log({
    level: "info",
    message: `New ${operation} requested: ${num1}+${num2}=${result}`,
  });
  res.send({ result });
});

app.get(`/subtract`, (req, res) => {
  const { num1, num2 } = req.query;
  const operation = "subtraction";
  const result = parseFloat(num1) - parseFloat(num2);
  if (isNaN(result)) {
    logger.error(`${req.ip} - /subtract - ${errorMsg}`);
    return res.status(400).send({ error: errorMsg });
  }
  logger.log({
    level: "info",
    message: `New ${operation} requested: ${num1}-${num2}=${result}`,
  });
  res.send({ result });
});

app.get(`/multiply`, (req, res) => {
  const { num1, num2 } = req.query;
  const result = parseFloat(num1) * parseFloat(num2);
  const operation = "mulitfly";
  if (isNaN(result)) {
    return res.status(400).send({ error: "Provide valid numbers" });
  }
  logger.log({
    level: "info",
    message: `New ${operation} requested: ${num1}*${num2}=${result}`,
  });
  res.send({ result });
});

app.get(`/divide`, (req, res) => {
  const { num1, num2 } = req.query;
  const result = parseFloat(num1) / parseFloat(num2);
  const operation = "division";
  if (isNaN(result)) {
    return res.status(400).send({ error: "Provide valid numbers" });
  }
  if (parseFloat(num2) === 0) {
    return res.status(400).send({ error: "Cannot devide by zero" });
  }
  logger.log({
    level: "info",
    message: `New ${operation} requested: ${num1}+${num2}=${result}`,
  });
  res.send({ result });
});

app.listen(port, () => {
  console.log(`Calculator app is running at http://localhost:${port}`);
});
