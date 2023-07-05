import Product from '../../models/Product.js'
import { StatusCodes } from 'http-status-codes'
import reviewValidationSchema from '../../validations/reviewValidations/reviewValidationSchema.js'

const createReview = async (req, res) => {
  const { comment, rating } = req.body
  const productId = req.params.productId

  const { error } = reviewValidationSchema(req.body)

  if (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: true,
      message: error.details[0].message,
    })
  }

  const product = await Product.findById(productId)
  if (!product) {
    return res.status(404).json({
      error: true,
      message: 'Product not found',
    })
  }

  const review = {
    comment,
    rating,
  }

  product.reviews.push(review)

  await product.save()

  return res.status(StatusCodes.OK).json({
    error: false,
    message: 'Review added successfully',
  })
}

const getReviewByProductId = async (req, res) => {
  const productId = req.params.productId

  const product = await Product.findById(productId)

  if (!product) {
    return res.status(StatusCodes.NOT_FOUND).json({
      error: true,
      message: 'Product not found!',
    })
  }

  const reviews = product.reviews

  return res.status(StatusCodes.OK).json({
    error: false,
    message: 'Product reviews fetched successfully!',
    reviews,
  })
}

export default { createReview, getReviewByProductId }
