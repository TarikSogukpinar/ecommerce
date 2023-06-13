import Joi from 'joi'

const searchCategoryValidationSchema = (body) => {
  const schema = Joi.object({
    categoryName: Joi.string().min(5).max(255).label('Category Name'),
    categoryDescription: Joi.string()
      .min(5)
      .max(255)
      .label('Category Description'),
  })
  return schema.validate(body)
}

export default searchCategoryValidationSchema
