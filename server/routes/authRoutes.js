import express from "express";
import {
  loginController,
  registerController,
  sendOTPController,
  submitOTPController,
} from "../controllers/authController.js";

import {
  addLoginValidation,
  addOTPvalidation,
  addUserValidation,
} from "../validation/users/userValidation.js";

const router = express.Router();

// Register routes
router.post("/register", addUserValidation, registerController);

// Login routes
router.post("/login", addLoginValidation, loginController);

// Forget Password (Send OTP) routes
router.post("/send-otp", addOTPvalidation, sendOTPController);

// Reset Password routes
router.post("/submit-otp", submitOTPController);

export default router;
