const { Router } = require("express");
const { check } = require("express-validator");

const {
  roleValidation,
  emailValidation,
  idUserIdValidation,
} = require("../helpers/db-validators");
const {
  getUsers,
  postUsers,
  putUsers,
  deleteUsers,
} = require("../controllers/users");
const { validateJWT, validateProps, hasRole } = require("../middlewares");

const router = Router();

router.get("/", [validateJWT], getUsers);

router.post(
  "/",
  [
    validateJWT,
    check("email", "Invalid email").isEmail(),
    check("email", "Email is required").not().isEmpty(),
    check("email").custom(emailValidation),
    check("name", "Name is required").not().isEmpty(),
    check("password", "Password is required").not().isEmpty(),
    check("password", "Password must be greater than 6").isLength({ min: 6 }),
    check("role", "Role is required").not().isEmpty(),
    check("role").custom(roleValidation),
    validateProps,
  ],
  postUsers
);

router.put(
  "/:id",
  [
    validateJWT,
    check("id", "Invalid id").isMongoId(),
    check("id").custom(idUserIdValidation),
    check("role").custom(roleValidation),
    validateProps,
  ],
  putUsers
);

router.delete(
  "/:id",
  [
    validateJWT,
    hasRole("ADMIN_ROLE", "SUPER_ADMIN_ROLE"),
    check("id", "Invalid id").isMongoId(),
    check("id").custom(idUserIdValidation),
    validateProps,
  ],
  deleteUsers
);
module.exports = router;
