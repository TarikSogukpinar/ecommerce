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

  const { title, description, status, response, messages } = req.body
  const createdBy = req.user.userId
  const createdRole = req.user.roles


  const ticket = new Ticket({
    title,
    description,
    status,
    response,
    createdBy,
    createdRole,
    messages: [
      {
        // user: createdBy,
        message: messages,
      },
    ],
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

const getAllTickets = async (req, res) => {
  const page = Number(req.query.pageNumber) || 1
  const pageSize = 20
  const count = await Ticket.countDocuments()

  const getAllTickets = await Ticket.find({})
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .sort('-createdAt')

  if (getAllTickets.length === 0) {
    return res.status(StatusCodes.NOT_FOUND).json({
      error: true,
      message: 'Tickets not found!',
    })
  }

  return res.json({
    error: false,
    tickets: getAllTickets,
    page,
    pages: Math.ceil(count / pageSize),
    total: count,
    source: 'database',
  })
}

export default { createTicket, getAllTickets }
