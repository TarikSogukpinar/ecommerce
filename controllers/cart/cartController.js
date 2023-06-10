import User from '../../models/User.js'
import Product from '../../models/Product.js'
import { StatusCodes } from 'http-status-codes'

const addToCart = async (req, res) => {
  const { id } = req.params
  const user = await User.findById(id)
  const product = await Product.findById(req.params.productId)

  if (!user) {
    return res.status(StatusCodes.NOT_FOUND).json({
      error: true,
      message: 'User not found!',
    })
  }

  if (product) {
    return res.status(StatusCodes.NOT_FOUND).json({
      error: true,
      message: 'Product not found!',
    })
  }

  if (user.cart.includes(product._id)) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: true,
      message: 'Product already in cart!',
    })
  }

  user.cart.push(product._id)

  const savedUser = await user.save()

  return res.status(StatusCodes.OK).json({
    error: false,
    message: 'Product added to cart successfully!',
    savedUser: savedUser,
  })
}

const getUserCart = async (req, res) => {
  const { id } = req.params
  const user = await User.findById(id).populate('cart')

  if (!user) {
    return res.status(StatusCodes.NOT_FOUND).json({
      error: true,
      message: 'User not found!',
    })
  }

  return res.status(StatusCodes.OK).json({
    error: false,
    message: 'User cart fetched successfully!',
    cart: user.cart,
  })
}

export default { addToCart, getUserCart }
