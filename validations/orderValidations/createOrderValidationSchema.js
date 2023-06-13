import Joi from 'joi'

const createOrderValidationSchema = (body) => {
  const schema = Joi.object({
    customerName: Joi.string()
      .required()
      .min(2)
      .max(255)
      .label('Customer Name'),
    orderItem: Joi.string().required().min(2).max(255).label('Order Item'),
    address: {
      street: Joi.string().required().min(2).max(255).label('Street'),
      city: Joi.string().required().min(2).max(255).label('City'),
      state: Joi.string().optional().min(2).max(255).label('State'),
      zip: Joi.string().optional().min(2).max(255).label('Zip'),
    },
  })
  return schema.validate(body)
}

export default createOrderValidationSchema
