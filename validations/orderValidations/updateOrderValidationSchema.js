import Joi from 'joi'

const updateOrderValidationSchema = (body) => {
  const schema = Joi.object({
    customerName: Joi.string()
      .optional()
      .min(2)
      .max(255)
      .label('Customer Name'),
    orderItem: Joi.string().optional().min(2).max(255).label('Order Item'),
    status: Joi.string()
      .optional()
      .min(2)
      .max(255)
      .valid(...['Processing', 'Shipped', 'Delivered', 'Cancelled'])
      .label('Status'),
    orderDate: Joi.string().optional().min(2).max(255).label('Order Date'),
    address: {
      street: Joi.string().optional().min(2).max(255).label('Street'),
      city: Joi.string().optional().min(2).max(255).label('City'),
      state: Joi.string().optional().min(2).max(255).label('State'),
      zip: Joi.string().optional().min(2).max(255).label('Zip'),
    },
  })
  return schema.validate(body)
}

export default updateOrderValidationSchema
