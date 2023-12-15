import joi from "joi";

// Schema for Creating a new category
export const categoryValid = joi.object({
  name: joi.string().required().error(new Error("Please enter a Name")),
  slug: joi.string().lowercase().error(new Error("Invalid slug")),
  photo: joi
    .object({
      data: joi.binary().required(),
      contentType: joi.string().required(),
    })
    .error(new Error("Invalid photo format")),
});
