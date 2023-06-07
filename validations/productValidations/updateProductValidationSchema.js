import Joi from 'joi'

const updateProductValidationSchema = (body) => {
  const schema = Joi.object({
    productName: Joi.string().optional().min(5).max(255).label('Product Name'),
    description: Joi.string().optional().min(5).max(255).label('Description'),
    price: Joi.number().optional().min(0).label('Price'),
    category: Joi.string().optional().min(5).max(255).label('Category'),
    brand: Joi.string().optional().min(2).max(255).label('Brand'),
    inStock: Joi.boolean().optional().label('In Stock'),
    inventory: Joi.number().integer().optional().min(0).label('Inventory'),
    rating: Joi.number().optional().min(0).max(5).label('Rating'),
    reviews: Joi.array()
      .items(
        Joi.object({
          userId: Joi.string().optional(),
          review: Joi.string().optional(),
          rating: Joi.number().min(0).max(5),
        }),
      )
      .label('Reviews'),
  })
  return schema.validate(body)
}

export default updateProductValidationSchema
