import { userValid } from "./userSchema.js";

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
