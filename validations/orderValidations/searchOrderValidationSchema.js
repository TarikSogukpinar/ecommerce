import Joi from 'joi'

const searchOrderValidationSchema = (body) => {
  const schema = Joi.object({
    customerName: Joi.string()
      .optional()
      .min(2)
      .max(255)
      .label('Customer Name'),
    orderItem: Joi.string().optional().min(2).max(255).label('Order Item'),
    status: Joi.string().optional().min(2).max(255).label('Status'),
    orderDate: Joi.string().optional().min(2).max(255).label('Order Date'),
  })
  return schema.validate(body)
}

export default searchOrderValidationSchema
