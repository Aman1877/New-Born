import { userValid } from "./userSchema.js";
import { userLogin } from "./userSchema.js";
import { sendOTP } from "./userSchema.js";
import { submitOTP } from "./userSchema.js";

// Registration Validation
export const addUserValidation = async (req, res, next) => {
  const value = await userValid.validate(req.body);
  if (value.error) {
    console.log(value.error.message);
    res.json({
      success: 0,
      message: value.error.message,
    });
  } else {
    next();
  }
};

// Login Validation
export const addLoginValidation = async (req, res, next) => {
  const value = await userLogin.validate(req.body);
  if (value.error) {
    console.log(value.error.message);
    res.json({
      success: 0,
      message: value.error.message,
    });
  } else {
    next();
  }
};

// Send OTP Validation
export const addOTPvalidation = async (req, res, next) => {
  const value = await sendOTP.validate(req.body);
  if (value.error) {
    console.log(value.error.message);
    res.json({
      success: 0,
      message: value.error.message,
    });
  } else {
    next();
  }
};

// Submit OTP Validation
export const addOTPPassvalidation = async (req, res, next) => {
  const value = await submitOTP.validate(req.body);
  if (value.error) {
    console.log(value.error.message);
    res.json({
      success: 0,
      message: value.error.message,
    });
  } else {
    next();
  }
};
