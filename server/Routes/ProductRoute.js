const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetalis,
  createProductReview,
  getProductReviews,
  getAdminProducts,
 
} = require("../Controllers/ProductController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/").get(getAllProducts);

router
  .route("/admin")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAdminProducts);

router
  .route("/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createProduct);

router
  .route("/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct)
  .get(getProductDetalis);

router.route("/review/:id").put(isAuthenticatedUser, createProductReview);

router
  .route("/reviews/:id")
  .get(getProductReviews)


module.exports = router;
