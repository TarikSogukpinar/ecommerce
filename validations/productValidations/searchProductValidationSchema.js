import Joi from 'joi'

const searchProductValidationSchema = (body) => {
  const schema = Joi.object({
    productName: Joi.string().min(1).max(255).label('Product Name'),
    description: Joi.string().min(1).max(255).label('Description'),
    price: Joi.number().min(1).max(1000000).label('Price'),
    brand: Joi.string().min(1).max(255).label('Brand'),
    category: Joi.string().min(1).max(255).label('Category'),
  })
  return schema.validate(body)
}

export default searchProductValidationSchema
