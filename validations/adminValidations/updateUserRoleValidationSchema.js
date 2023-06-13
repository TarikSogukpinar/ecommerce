import Joi from 'joi'

const updateUserRoleValidationSchema = (body) => {
  const schema = Joi.object({
    roles: Joi.string()
      .optional()
      .min(2)
      .max(255)
      .valid(...['user', 'seller', 'admin'])
      .label('Roles'),
  })
  return schema.validate(body)
}

export default updateUserRoleValidationSchema
