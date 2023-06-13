import Order from '../../models/Order.js'
import createOrderValidationSchema from '../../validations/orderValidations/createOrderValidationSchema.js'
import { StatusCodes } from 'http-status-codes'

const createOrder = async (req, res) => {
  const { error } = createOrderValidationSchema(req.body)
  if (error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: true, message: error.details[0].message })
  }
  req.body.userId = req.user.userId
  const order = new Order(req.body)

  const savedOrder = await order.save()

  return res.status(StatusCodes.OK).json({
    error: false,
    message: 'Order created successfully!',
    savedOrder: savedOrder,
  })
}

export default { createOrder }
