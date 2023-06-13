import Joi from 'joi'

const updateOrderStatusValidationSchema = (body) => {
  const schema = Joi.object({
    status: Joi.string()
      .required()
      .min(2)
      .max(255)
      .valid(...['Processing', 'Shipped', 'Delivered', 'Cancelled'])
      .label('Status'),
  })
  return schema.validate(body)
}

export default updateOrderStatusValidationSchema
