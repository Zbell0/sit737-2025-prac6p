const logger = require("../logger");

exports.power = (req, res) => {
  const { num1, num2 } = req.query;
  const base = parseFloat(num1);
  const exponent = parseFloat(num2);
  const operation = "exponentiation";

  if (isNaN(base) || isNaN(exponent)) {
    const errorMsg = "Provide valid numbers";
    logger.error(`${req.ip} - /power - ${errorMsg}`);
    return res.status(400).send({ error: errorMsg });
  }

  const result = Math.pow(base, exponent);
  logger.info(`New ${operation} requested: ${num1}^${num2}=${result}`);
  res.send({ result });
};

exports.sqrt = (req, res) => {
  const { num } = req.query;
  const value = parseFloat(num);
  const operation = "square root";

  if (isNaN(value)) {
    const errorMsg = "Provide a valid number";
    logger.error(`${req.ip} - /sqrt - ${errorMsg}`);
    return res.status(400).send({ error: errorMsg });
  }

  if (value < 0) {
    const errorMsg = "Cannot take square root of a negative number";
    logger.error(`${req.ip} - /sqrt - ${errorMsg}`);
    return res.status(400).send({ error: errorMsg });
  }

  const result = Math.sqrt(value);
  logger.info(`New ${operation} requested: √${num}=${result}`);
  res.send({ result });
};

exports.mod = (req, res) => {
  const { num1, num2 } = req.query;
  const dividend = parseFloat(num1);
  const divisor = parseFloat(num2);
  const operation = "modulo";

  if (isNaN(dividend) || isNaN(divisor)) {
    const errorMsg = "Provide valid numbers";
    logger.error(`${req.ip} - /mod - ${errorMsg}`);
    return res.status(400).send({ error: errorMsg });
  }

  if (divisor === 0) {
    const errorMsg = "Cannot modulo by zero";
    logger.error(`${req.ip} - /mod - ${errorMsg}`);
    return res.status(400).send({ error: errorMsg });
  }

  const result = dividend % divisor;
  logger.info(`New ${operation} requested: ${num1}%${num2}=${result}`);
  res.send({ result });
};
