import Order from '../../models/Order.js'
import Product from '../../models/Product.js'
import updateOrderStatusValidationSchema from '../../validations/orderValidations/updateOrderStatusValidationSchema.js'
import updateOrderValidationSchema from '../../validations/orderValidations/updateOrderValidationSchema.js'
import searchOrderValidationSchema from '../../validations/orderValidations/searchOrderValidationSchema.js'
import createOrderValidationSchema from '../../validations/orderValidations/createOrderValidationSchema.js'
import { StatusCodes } from 'http-status-codes'

const createOrder = async (req, res) => {
  const { error } = createOrderValidationSchema(req.body)
  
  if (error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: true, message: error.details[0].message })
  }
  const { userId, customerName, orderItem, address } = req.body

  const { productId } = req.params

  const product = await Product.findById(productId)
  if (!product) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ error: true, message: 'Product not found' })
  }

  const order = new Order({
    userId: req.user.userId,
    productId,
    customerName,
    orderItem,
    address,
  })

  const savedOrder = await order.save()

  return res.status(StatusCodes.OK).json({
    error: false,
    message: 'Order created successfully!',
    savedOrder: savedOrder,
  })
}

const searchOrder = async (req, res) => {
  const { error } = searchOrderValidationSchema(req.query)

  if (error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: true, message: error.details[0].message })
  }

  const order = await Order.find({
    $or: [
      { customerName: { $regex: new RegExp(req.params.key, 'i') } },
      { orderItem: { $regex: new RegExp(req.params.key, 'i') } },
      { status: { $regex: new RegExp(req.params.key, 'i') } },
      { orderDate: { $regex: new RegExp(req.params.key, 'i') } },
    ],
  })

  if (order.length === 0) {
    return res.status(StatusCodes.NOT_FOUND).json({
      error: true,
      message: 'No Order found matching the provided query parameters!',
    })
  }

  return res.status(StatusCodes.OK).json({
    error: false,
    order: order,
  })
}

const getOrderById = async (req, res) => {
  const id = req.params.id
  const order = await Order.findById(id)

  if (order == null) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: 'Order not found!' })
  }

  return res.status(StatusCodes.OK).json({
    error: false,
    order: order,
  })
}

const updateOrder = async (req, res) => {
  const { error } = updateOrderValidationSchema(req.body)

  if (error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: true, message: error.details[0].message })
  }
  const orderId = req.params.id
  const updatedOrderData = req.body

  const updatedOrder = await Order.findOneAndUpdate(
    { _id: orderId },
    updatedOrderData,
    { new: true },
  )

  if (!updatedOrder) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ error: true, message: 'Order not found!' })
  }

  return res.status(StatusCodes.OK).json({
    error: false,
    message: 'Order updated successfully!',
    updatedOrder: updatedOrder,
  })
}

const cancelOrder = async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (!order)
    return res.status(404).json({ message: 'No order found with this ID.' })

  order.status = 'Cancelled'

  const updatedOrder = await order.save()

  return res.status(StatusCodes.OK).json({
    error: false,
    message: 'Order cancelled successfully!',
    updatedOrder: updatedOrder,
  })
}

const updateOrderStatus = async (req, res) => {
  const { error } = updateOrderStatusValidationSchema(req.body)

  if (error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: true, message: error.details[0].message })
  }

  const order = await Order.findById(req.params.id)

  if (!order)
    return res.status(404).json({ message: 'No order found with this ID.' })

  order.status = req.body.status

  const updatedOrder = await order.save()

  return res.status(StatusCodes.OK).json({
    error: false,
    message: 'Order status updated successfully!',
    updatedOrder: updatedOrder,
  })
}

export default {
  createOrder,
  searchOrder,
  getOrderById,
  updateOrder,
  cancelOrder,
  updateOrderStatus,
}
