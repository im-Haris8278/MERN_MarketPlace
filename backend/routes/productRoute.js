const express = require("express");
const Router = express.Router();
const {
  createProduct,
  getAllProducts,
  getMerchantProducts,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createProductReview,
  getProductReviews,
  deleteReview,
} = require("../controller/productController");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

Router.route("/merchant/product/new").post(
  isAuthenticatedUser,
  authorizeRoles("Merchant"),
  createProduct
);

Router.route("/merchant/products").get(
  isAuthenticatedUser,
  authorizeRoles("Merchant"),
  getMerchantProducts
);

Router.route("/merchant/product/:id").put(
  isAuthenticatedUser,
  authorizeRoles("Merchant"),
  updateProduct
);

Router.route("/merchant/product/:id").delete(
  isAuthenticatedUser,
  authorizeRoles("Merchant"),
  deleteProduct
);

Router.route("/products").get(getAllProducts);

Router.route("/product/:id").get(getProductDetails);

Router.route("/product/review").put(isAuthenticatedUser, createProductReview);

Router.route("/P/reviews").get(getProductReviews);

Router.route("/P/reviews").delete(
  isAuthenticatedUser,
  authorizeRoles("Merchant"),
  deleteReview
);

module.exports = Router;
