import Joi from 'joi'

const updateProductDiscountValidationSchema = (body) => {
  const schema = Joi.object({
    percentage: Joi.number()
      .positive()
      .allow(null)
      .default(0)
      .label('Percentage Must be Number'),
  })
  return schema.validate(body)
}

export default updateProductDiscountValidationSchema
