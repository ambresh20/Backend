const express = require("express");
const registration = require("../controller/createUser");
const login = require("../controller/signUser");
const contactStore = require("../controller/storeContactUser");
const {
  forgetPassword,
  resetPassword,
} = require("../controller/forgotPassword");
const passport = require("passport");
const { loginSuccess } = require("../controller/googleAuthController");
const adminLogin = require("../controller/adminLogin") ;
const allUser = require("../controller/getUser") ;

const router = express.Router();

//Create Registration route
router.post("/registration", registration);

// GET ALL User Route
router.get("/all-user", allUser);

// Login route
router.post("/login", login);

// Store contact data ROUTE
router.post("/contact-store", contactStore);

// FORGET and reset
router.post("/forgot-password", forgetPassword);
router.post("/reset-password/:token", resetPassword);

// Admin Login
router.post("/admin-login", adminLogin) ;


// Google OAuth login
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "https://fuct-frontend.vercel.app/dashboard",
    failureRedirect: "https://fuct-frontend.vercel.app/login",
  })
);

// Login success route
router.get("/login/success", loginSuccess);


// EXPORT MODULE
module.exports = router;
