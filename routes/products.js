const { Router } = require("express");
const { check } = require("express-validator");

const { validateProps } = require("../middlewares/user-validation");

const { validateJWT, hasRole } = require("../middlewares");
const {
  productIdValidation,
  categoryIdValidation,
} = require("../helpers/db-validators");
const {
  getProduct,
  getProducts,
  postCreateProduct,
  putProduct,
  deleteProduct,
} = require("../controllers/products");

const router = Router();

router.get("/", [validateJWT, validateProps], getProducts);

router.get(
  "/:id",
  [
    validateJWT,
    check("id", "Invalid id").isMongoId(),
    check("id").custom(productIdValidation),
    validateProps,
  ],
  getProduct
);

router.post(
  "/",
  [
    validateJWT,
    check("name", "Name is required").not().isEmpty(),
    check("category", "Invalid category id").isMongoId(),
    check("category").custom(categoryIdValidation),
    validateProps,
  ],
  postCreateProduct
);

router.put(
  "/:id",
  [
    validateJWT,
    check("id", "Invalid id").isMongoId(),
    check("id").custom(productIdValidation),
    validateProps,
  ],
  putProduct
);

router.delete(
  "/:id",
  [
    validateJWT,
    check("id", "Invalid id").isMongoId(),
    check("id").custom(productIdValidation),
    hasRole("ADMIN_ROLE", "SUPER_ADMIN_ROLE"),
    validateProps,
  ],
  deleteProduct
);

module.exports = router;
