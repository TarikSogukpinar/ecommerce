import Ticket from '../../models/Ticket.js'
import { StatusCodes } from 'http-status-codes'
import createSupportValidationSchema from '../../validations/supportValidations/createSupportValidationSchema.js'

const createTicket = async (req, res) => {
  const { error } = createSupportValidationSchema(req.body)

  if (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: true,
      message: error.details[0].message,
    })
  }
  
  const { title, description, status, response } = req.body

  if (req.user.role !== 'support') return res.sendStatus(403)

  const ticket = new Ticket({
    title,
    description,
    status,
    response,
  })

  const createdTicket = await ticket.save()

  if (createdTicket) {
    return res
      .status(StatusCodes.CREATED)
      .json({ error: false, ticket: createdTicket })
  }

  return res.status(StatusCodes.BAD_REQUEST).json({
    error: true,
    message: 'Invalid Ticket Data',
  })
}

export default { createTicket }
