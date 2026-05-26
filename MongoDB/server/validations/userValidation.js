const Joi = require("joi");

const createUserSchema = Joi.object({
  name: Joi.string()
   .pattern(/^[a-zA-Z]{3,20}$/)
    .required() 
    .messages({    //Note: here joi has common error keys like string.empty and others which lets it decide what error should be displayed and messages should be Object only
      "string.pattern.base":
        "Username must be 3–20 characters and contain only letters, not numbers or others",
      "string.empty": "Username is required",
    }),
  email: Joi.string().email().required(),
});
module.exports = createUserSchema;
