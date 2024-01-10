const express = require("express");
const authController = require("../controllers/auth");
const { check, body } = require("express-validator");
const User = require('../models/user');
const router = express.Router();

router.get("/login", authController.getLogin);

router.get("/signup", authController.getSignup);

router.post(
  "/login",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email address.")
      .normalizeEmail(),
    body("password", "Password has to be valid.")
      .isLength({ min: 5 })
      .isAlphanumeric()
      .trim(),
  ],
  authController.postLogin
);

router.post(
  "/signup",
  [
    check("email")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject('Account already exists, login or create with another email!');
          }
        });
      }),
    body(
      "password",
      "PLease enter a password with only numbers and characters and at least 5 characters"
    )
      .isLength({ min: 5 })
      .isAlphanumeric(),
    body("confirmPassword").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password do not match!");
      }
      return true;
    }),
  ],
  authController.postSignup
);

router.post("/logout", authController.postLogout);

router.get("/reset", authController.getReset);

router.get("/reset/:token", authController.getNewPassword);

router.post("/reset", authController.postReset);

router.post("/new-password", authController.postNewPassword);

module.exports = router;
