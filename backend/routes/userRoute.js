const express = require("express");
const Router = express.Router();
const {
  registerUser,
  loginUser,
  logout,
  updateProfile,
  getUserDetails,
  updatePassword,
  forgotPassword,
  resetPassword,
  getAllUser,
  getSingleUser,
  updateUserRole,
  deleteUser,
  deleteProfile,
} = require("../controller/userController");

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

Router.route("/register").post(registerUser);

Router.route("/login").post(loginUser);

Router.route("/password/forgot").post(forgotPassword);

Router.route("/password/reset/:token").put(resetPassword);

Router.route("/logout").get(isAuthenticatedUser, logout);

Router.route("/me").get(isAuthenticatedUser, getUserDetails);

Router.route("/me/update").put(isAuthenticatedUser, updateProfile);

Router.route("/me/delete").delete(isAuthenticatedUser, deleteProfile);

Router.route("/password/update").put(isAuthenticatedUser, updatePassword);

Router.route("/admin/users").get(
  isAuthenticatedUser,
  authorizeRoles("Admin"),
  getAllUser
);

Router.route("/admin/user/:id").get(
  isAuthenticatedUser,
  authorizeRoles("Admin"),
  getSingleUser
);

Router.route("/admin/user/:id").put(
  isAuthenticatedUser,
  authorizeRoles("Admin"),
  updateUserRole
);

Router.route("/admin/user/:id").delete(
  isAuthenticatedUser,
  authorizeRoles("Admin"),
  deleteUser
);

module.exports = Router;
