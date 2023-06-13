import User from '../../models/User.js'
import Product from '../../models/Product.js'
import { StatusCodes } from 'http-status-codes'

const addFavorite = async (req, res) => {
  const user = await User.findById(req.params.userId)
  const product = await Product.findById(req.params.productId)

  if (!user) {
    return res.status(StatusCodes.NOT_FOUND).json({
      error: true,
      message: 'User not found!',
    })
  }

  if (!product) {
    return res.status(StatusCodes.NOT_FOUND).json({
      error: true,
      message: 'Product not found!',
    })
  }

  if (user.favorites.includes(req.params.productId)) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: 'Product already in favorites.' })
  }

  user.favorites.push(product._id)

  const updatedUser = await user.save()

  return res.status(StatusCodes.OK).json({
    error: false,
    message: 'Product added to favorites successfully!',
    updatedUser: updatedUser,
  })
}

const getFavoriteProducts = async (req, res) => {
  const user = await User.findById(req.params.userId)

  if (!user) {
    return res.status(StatusCodes.NOT_FOUND).json({
      error: true,
      message: 'User not found!',
    })
  }
  const favoriteProductIds = user.favorites

  const favoriteProducts = await Product.find({
    _id: { $in: favoriteProductIds },
  })

  return res.status(StatusCodes.OK).json({
    error: false,
    message: 'Favorite products fetched successfully!',
    favoriteProducts: favoriteProducts,
  })
}

const deleteFavoriteProducts = async (req, res) => {
  const user = await User.findById(req.params.userId)

  if (!user) {
    return res.status(404).json({ message: 'User not found.' })
  }

  if (!user.favorites.includes(req.params.productId)) {
    return res.status(400).json({ message: 'Product not in favorites.' })
  }

  const index = user.favorites.indexOf(req.params.productId)
  if (index > -1) {
    user.favorites.splice(index, 1)
  }

  const updatedUser = await user.save()

  return res.status(200).json({
    error: false,
    message: 'Product removed from favorites successfully!',
    updatedUser: updatedUser.favorites,
  })
}

export default { addFavorite, getFavoriteProducts, deleteFavoriteProducts }
