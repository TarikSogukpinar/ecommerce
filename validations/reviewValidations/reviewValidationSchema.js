import Joi from 'joi'

const reviewValidationSchema = (body) => {
  const schema = Joi.object({
    comment: Joi.string().required().min(5).max(255).label('Comment'),
    rating: Joi.number().required().min(1).max(5).label('Rating'),
  })
  return schema.validate(body)
}

export default reviewValidationSchema
