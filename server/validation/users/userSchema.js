import joi from "joi";

// Schema for Registration
export const userValid = joi.object({
  name: joi.string().required().error(new Error("Please enter a Name")),
  email: joi
    .string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required()
    .error(new Error("Please enter a valid Email")),
  password: joi
    .string()
    .required()
    .min(8) // Minimum length of 8 characters
    .pattern(
      new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"
      )
    )
    .error(
      new Error(
        "Password must be at least 8 characters and contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      )
    ),
  phone: joi
    .number()
    .required()
    .min(10)
    .error(new Error("Please enter a valid Phone Number")),
  role: joi.number().default(0),
});

// Schema for Login
export const userLogin = joi.object({
  email: joi
    .string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required()
    .error(new Error("Please enter a valid Email")),
  password: joi.string().required().error(new Error("Please enter a Password")),
});

// Schema for send OTP
export const sendOTP = joi.object({
  email: joi
    .string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required()
    .error(new Error("Please enter a valid Email")),
});

// Schema for submit OTP
export const submitOTP = joi.object({
  otp: joi.string().min(6).error(new Error("Please Enter a valid OTP")),
  password: joi
    .string()
    .required()
    .min(8) // Minimum length of 8 characters
    .pattern(
      new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"
      )
    )
    .error(
      new Error(
        "Password must be at least 8 characters and contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      )
    ),
});
