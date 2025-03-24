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

app.get("/subtract", (req, res) => {
  const { num1, num2 } = req.query;
  const operation = "subtraction";
  const result = parseFloat(num1) - parseFloat(num2);

  if (isNaN(result)) {
    const errorMsg = "Provide valid numbers";
    logger.error(`${req.ip} - /subtract - ${errorMsg}`);
    return res.status(400).send({ error: errorMsg });
  }
  logger.log({
    level: "info",
    message: `New ${operation} requested: ${num1}-${num2}=${result}`,
  });
  res.send({ result });
});

app.get("/multiply", (req, res) => {
  const { num1, num2 } = req.query;
  const parsedNum1 = parseFloat(num1);
  const parsedNum2 = parseFloat(num2);
  const result = parsedNum1 * parsedNum2;
  const operation = "multiplication";

  if (isNaN(parsedNum1) || isNaN(parsedNum2)) {
    const errorMsg = "Provide valid numbers";
    logger.error(`${req.ip} - /multiply - ${errorMsg}`);
    return res.status(400).send({ error: errorMsg });
  }
  logger.log({
    level: "info",
    message: `New ${operation} requested: ${num1}*${num2}=${result}`,
  });
  res.send({ result });
});

app.get("/divide", (req, res) => {
  const { num1, num2 } = req.query;
  const parsedNum1 = parseFloat(num1);
  const parsedNum2 = parseFloat(num2);

  if (isNaN(parsedNum1) || isNaN(parsedNum2)) {
    const errorMsg = "Provide valid numbers";
    logger.error(`${req.ip} - /divide - ${errorMsg}`);
    return res.status(400).send({ error: errorMsg });
  }

  if (parsedNum2 === 0) {
    const errorMsg = "Cannot divide by zero";
    logger.error(`${req.ip} - /divide - ${errorMsg}`);
    return res.status(400).send({ error: errorMsg });
  }

  const result = parsedNum1 / parsedNum2;
  const operation = "division";
  logger.log({
    level: "info",
    message: `New ${operation} requested: ${num1}/${num2}=${result}`,
  });
  res.send({ result });
});

app.listen(port, () => {
  console.log(`Calculator app is running at http://localhost:${port}`);
});
