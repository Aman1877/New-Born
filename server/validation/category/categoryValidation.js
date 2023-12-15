import { categoryValid } from "./categorySchema.js";

// Creating a new category validation
export const addCategoryValidation = async (req, res, next) => {
  try {
    const value = await categoryValid.validate(req.body);
    console.log(value);
    if (value.error) {
      console.log(value.error.message);
      res.json({
        success: 0,
        message: value.error.message,
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error.message);
    res.json({
      success: 0,
      message: error.message,
    });
  }
};
