const { validationResult } = require("express-validator");

const validateProps = (req, res, next) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    return res.status(400).json(validationErrors);
  }

  next();
};

module.exports = {
  validateProps,
};
