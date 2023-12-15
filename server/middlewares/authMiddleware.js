import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

// Protected( protect user) Routes token base
// if you have token then and only then you can open that route for that we have to verify
export const requireSignIn = async (req, res, next) => {
  // req.headers.authorization ma tmaare pass krvu pde toj jwadese
  try {
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    // decode nai thaay tya sudhi id nai mle
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
  }
};

// Admin acceess (1-admin 0-user)
// Admin acceess
export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (user.role !== 1) {
      return res.status(401).send({
        success: false,
        message: "UnAuthorized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: "Error in admin middelware",
    });
  }
};
