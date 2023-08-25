import Payment from '../../models/Payment.js'
import Product from '../../models/Product.js'
import { StatusCodes } from 'http-status-codes'

const createPayment = async (req, res) => {
  const { userId, productId, amount, cardNumber, expiryDate, cvv } = req.body

  const payment = new Payment({
    userId,
    productId,
    amount,
    cardNumber,
    expiryDate,
    cvv,
  })

  const product = await Product.findById(productId)

  if (!product) {
    return res.status(StatusCodes.NOT_FOUND).json({
      error: true,
      message: 'Product not found!',
    })
  }

  await payment.save()
}

export default { createPayment }
