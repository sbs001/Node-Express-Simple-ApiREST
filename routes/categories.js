const { Router } = require("express");
const { check } = require("express-validator");

const { validateProps } = require("../middlewares/user-validation");
const {
  getCategories,
  getCategory,
  putCategory,
  deleteCategory,
  postCreateCategory,
} = require("../controllers/categories");
const { validateJWT, hasRole } = require("../middlewares");
const { categoryIdValidation } = require("../helpers/db-validators");

const router = Router();

router.get("/", [validateJWT, validateProps], getCategories);

router.get(
  "/:id",
  [
    validateJWT,
    check("id", "Invalid id").isMongoId(),
    check("id").custom(categoryIdValidation),
    validateProps,
  ],
  getCategory
);

router.post(
  "/",
  [
    validateJWT,
    check("name", "Name is required").not().isEmpty(),
    validateProps,
  ],
  postCreateCategory
);

router.put(
  "/:id",
  [
    validateJWT,
    check("id", "Invalid id").isMongoId(),
    check("id").custom(categoryIdValidation),
    check("name", "Name is required").not().isEmpty(),
    validateProps,
  ],
  putCategory
);

router.delete(
  "/:id",
  [
    validateJWT,
    check("id", "Invalid id").isMongoId(),
    check("id").custom(categoryIdValidation),
    hasRole("ADMIN_ROLE", "SUPER_ADMIN_ROLE"),
    validateProps,
  ],
  deleteCategory
);

module.exports = router;
