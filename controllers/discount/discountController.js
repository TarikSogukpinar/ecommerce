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
    return res.status(StatusCodes.NotFound).json({
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

export default { updateProductDiscount }
