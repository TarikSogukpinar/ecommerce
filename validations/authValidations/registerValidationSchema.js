import Joi from "joi";
import JoiPasswordComplexity from "joi-password-complexity";

const registerValidationSchema = (body) => {
  const schema = Joi.object({
    firstName: Joi.string().required().min(3).max(50).label("User Name"),
    lastName: Joi.string().required().min(3).max(50).label("User Name"),
    email: Joi.string().email().required().min(5).max(50).label("Email"),
    password: JoiPasswordComplexity({
      min: 5,
      max: 50,
      lowerCase: 1,
      upperCase: 1,
      requirementCount: 1,
    }).label("Password"),
    confirmPassword: Joi.any()
      .equal(Joi.ref("password"))
      .required()
      .label("Confirm password")
      .messages({ "any.only": "{{#label}} does not match" }),
  });
  return schema.validate(body);
};

export default registerValidationSchema;
