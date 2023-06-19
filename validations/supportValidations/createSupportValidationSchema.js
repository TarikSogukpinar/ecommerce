import Joi from 'joi'

const createSupportValidationSchema = (body) => {
  const schema = Joi.object({
    title: Joi.string().required().min(5).max(255).label('Title'),
    description: Joi.string().required().min(5).max(255).label('Description'),
    status: Joi.string().required().min(5).max(255).label('Status'),
    response: Joi.string().optional().min(5).max(255).label('Response'),
  })
  return schema.validate(body)
}

export default createSupportValidationSchema
