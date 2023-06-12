import Joi from 'joi'

const updateCategoryValidationSchema = (body) => {
  const schema = Joi.object({
    categoryName: Joi.string()
      .required()
      .min(5)
      .max(255)
      .label('Category Name'),
    categoryDescription: Joi.string()
      .optional()
      .min(5)
      .max(255)
      .label('Category Description'),
  })
  return schema.validate(body)
}

export default updateCategoryValidationSchema
