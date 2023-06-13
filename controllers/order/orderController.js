import Order from '../../models/Order.js'

const createOrder = async (req, res) => {
  const order = new Order({
    customerName: req.body.customerName,
    orderItem: req.body.orderItem,
    address: {
      street: req.body.address.street,
      city: req.body.address.city,
      state: req.body.address.state,
      zip: req.body.address.zip,
    },
    userId: req.userId._id,
  })
  const savedOrder = await order.save()
  res.json(savedOrder)
}

export default { createOrder }
