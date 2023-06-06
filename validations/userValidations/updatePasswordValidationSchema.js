import Joi from "joi";
import JoiPasswordComplexity from "joi-password-complexity";

const updatePasswordValidationSchema = (body) => {
  const schema = Joi.object({
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

export default updatePasswordValidationSchema;
