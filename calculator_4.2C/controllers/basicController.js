const logger = require("winston");

exports.add = (req, res) => {
  const { num1, num2 } = req.query;
  const result = parseFloat(num1) + parseFloat(num2);
  const operation = "addition";

  if (isNaN(result)) {
    const errorMsg = "Provide valid numbers";
    logger.error(`${req.ip} - /add - ${errorMsg}`);
    return res.status(400).send({ error: errorMsg });
  }

  logger.info(`New ${operation} requested: ${num1}+${num2}=${result}`);
  res.send({ result });
};

exports.subtract = (req, res) => {
  const { num1, num2 } = req.query;
  const result = parseFloat(num1) - parseFloat(num2);
  const operation = "subtraction";

  if (isNaN(result)) {
    const errorMsg = "Provide valid numbers";
    logger.error(`${req.ip} - /subtract - ${errorMsg}`);
    return res.status(400).send({ error: errorMsg });
  }

  logger.info(`New ${operation} requested: ${num1}-${num2}=${result}`);
  res.send({ result });
};

exports.multiply = (req, res) => {
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

  logger.info(`New ${operation} requested: ${num1}*${num2}=${result}`);
  res.send({ result });
};

exports.divide = (req, res) => {
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

  logger.info(`New ${operation} requested: ${num1}/${num2}=${result}`);
  res.send({ result });
};
