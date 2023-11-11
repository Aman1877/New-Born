import userModel from "../models/userModel.js";
import { hashPassword } from "../helpers/authHelpers.js";

// Register Controller
export const registerController = async (req, res, next) => {
  try {
    console.log("body data", req.body);
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
