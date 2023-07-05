import Joi from 'joi'

const updateProductDiscountValidationSchema = (body) => {
  const schema = Joi.object({
    percentage: Joi.number(),
  })
  return schema.validate(body)
}

export default updateProductDiscountValidationSchema
