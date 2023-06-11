import Joi from 'joi'
import JoiPasswordComplexity from 'joi-password-complexity'

const updateUserByIdValidationSchema = (body) => {
  const schema = Joi.object({
    firstName: Joi.string().optional().min(3).max(50).label('User Name'),
    lastName: Joi.string().optional().min(3).max(50).label('Last Name'),
    email: Joi.string().email().optional().min(5).max(50).label('Email'),
    password: JoiPasswordComplexity({
      min: 5,
      max: 50,
      lowerCase: 1,
      upperCase: 1,
      requirementCount: 1,
    }).label('Password'),
    confirmPassword: Joi.any()
      .equal(Joi.ref('password'))
      .optional()
      .label('Confirm password')
      .messages({ 'any.only': '{{#label}} does not match' }),
  })
  return schema.validate(body)
}

export default updateUserByIdValidationSchema
