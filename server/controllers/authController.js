import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "../helpers/authHelpers.js";
import JWT from "jsonwebtoken";
import nodemailer from "nodemailer";

// Register Controller
export const registerController = async (req, res, next) => {
  try {
    const { name, email, password, phone } = req.body;

    // Check for existing user
    const exisitingUser = await userModel.findOne({ email });
    // Exisiting user
    if (exisitingUser) {
      return res.status(200).send({
        success: false,
        message: "Already Register please login",
      });
    }
    // Register new user
    const hashedPassword = await hashPassword(password);
    const user = await new userModel({
      name,
      email,
      phone,
      password: hashedPassword,
    }).save();

    res.status(201).send({
      success: true,
      message: "User Register Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registration",
      error,
    });
  }
};

// Login Controller
export const loginController = async (req, res, next) => {
  try {
    const { password, email } = req.body;
    // Check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(200).send({
        success: false,
        message: "Email is not registerd",
      });
    }
    // Check password
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }
    // if match then assign token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "Login Successfully",
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Login",
      error,
    });
  }
};

// Forget Password (Send OTP)
export const sendOTPController = async (req, res, next) => {
  try {
    const { email } = req.body;
    const _otp = Math.floor(100000 + Math.random() * 900000);

    // Check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(200).send({
        success: false,
        message: "Email is not registerd",
      });
    }

    // Send OTP in mail
    const transporter = await nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "dummyreason187@gmail.com", // Sender email address
        pass: "hyjo tfqz skag qfbw", // App password from Gmail account
      },
    });

    const info = await transporter.sendMail({
      from: {
        name: "Aman Mansuri",
        address: "dummyreason187@gmail.com",
      },
      to: req.body.email,
      subject: "OTP verification for NewBorn",
      text: String(_otp), // Generating OTP
    });
    if (info.messageId) {
      // OTP update through email
      const updatedUser = await userModel.updateOne(
        { email: req.body.email },
        { otp: _otp }
      );
      if (updatedUser) {
        res.status(200).send({
          success: true,
          message: "OTP sent Successfully",
        });
      }
    } else {
      res.status(500).send({
        success: false,
        message: "Server error",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Sending OTP",
      error,
    });
  }
};

// Forget Password (Submit OTP)
export const submitOTPController = async (req, res, next) => {
  try {
    const { otp, password } = req.body;

    // Check user through OTP that user is registered
    const user = await userModel.findOne({ otp });
    if (!user) {
      return res.status(200).send({
        success: false,
        message: "OTP is not correct",
      });
    }
    const hashedPassword = await hashPassword(password);
    // if we get the user through OTP then
    const resetPassword = await userModel.updateOne({
      email: user.email,
      password: hashedPassword,
    });
    res.status(200).send({
      success: true,
      message: "Password updated Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in submiting OTP",
      error,
    });
  }
};
