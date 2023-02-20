const express = require("express");
const Router = express.Router();
const {
  shopRegister,
  shopUpdate,
  shopDelete,
  getAllShops,
  getShopDetails,
  getAdminShops,
  createShopReview,
  getShopReviews,
  deleteReview,
} = require("../controller/shopController");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

Router.route("/shop/new").post(
  isAuthenticatedUser,
  authorizeRoles("Merchant"),
  shopRegister
);

Router.route("/merchant/shop/:id").put(
  isAuthenticatedUser,
  authorizeRoles("Merchant"),
  shopUpdate
);

Router.route("/merchant/shop/:id").delete(
  isAuthenticatedUser,
  authorizeRoles("Merchant"),
  shopDelete
);

Router.route("/shops").get(getAllShops);

Router.route("/admin/shops").get(
  isAuthenticatedUser,
  authorizeRoles("Admin"),
  getAdminShops
);

Router.route("/shop/:id").get(getShopDetails);

Router.route("/S/review").put(isAuthenticatedUser, createShopReview);

Router.route("/S/reviews").get(getShopReviews);

Router.route("/S/review").delete(isAuthenticatedUser, deleteReview);

module.exports = Router;
