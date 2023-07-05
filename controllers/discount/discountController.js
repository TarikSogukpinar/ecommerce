import Product from '../../models/Product.js'
import { StatusCodes } from 'http-status-codes'
import updateProductDiscountValidationSchema from '../../validations/discountValidations/updateProductDiscountValidationSchema.js'

const updateProductDiscount = async (req, res) => {
  const productId = req.params.id
  const discountPercentage = parseFloat(req.body.percentage)

  const { error } = updateProductDiscountValidationSchema(req.body)

  if (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: true,
      message: error.details[0].message,
    })
  }

  const product = await Product.findById(productId)

  if (!product) {
    return res.status(StatusCodes.NOT_FOUND).json({
      error: true,
      message: 'Product not found',
    })
  }

  const discountAmount = (product.price * discountPercentage) / 100
  product.price -= discountAmount
  await product.save()

  return res.status(StatusCodes.OK).json({
    error: false,
    product: product,
  })
}

const updateTopExpensiveProductDiscount = async (req, res) => {
  const products = await Product.find().sort({ price: -1 }).limit(10)

  if (!products) {
    return res.status(StatusCodes.NOT_FOUND).json({
      error: true,
      message: 'Products not found',
    })
  }

  products.forEach(async (product) => {
    const discountAmount = (product.price * req.body.percentage) / 100
    product.discount = discountAmount
    await product.save()
  })

  return res.status(StatusCodes.OK).json({
    error: false,
    products: products,
  })
}

export default { updateProductDiscount, updateTopExpensiveProductDiscount }
