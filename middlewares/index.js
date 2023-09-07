module.exports = {
  ...require("../middlewares/user-validation"),
  ...require("../middlewares/jwt-validations"),
  ...require("../middlewares/role-validations"),
};
