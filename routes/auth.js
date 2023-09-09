const { Router } = require("express");
const { check } = require("express-validator");

const { postLogin, postGoogleLogin } = require("../controllers/auth");
const { validateProps } = require("../middlewares/user-validation");

const router = Router();

router.post(
  "/login",
  [
    check("email", "Email is required").not().isEmpty(),
    check("password", "Password is required").not().isEmpty(),
    validateProps,
  ],
  postLogin
);

router.post(
  "/google-login",
  [check("id_token", "id_token is required").not().isEmpty(), validateProps],
  postGoogleLogin
);

module.exports = router;
