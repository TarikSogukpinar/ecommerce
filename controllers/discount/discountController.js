import Product from '../../models/Product.js'
import { StatusCodes } from 'http-status-codes'

const updateProductDiscount = async (req, res) => {
  const productId = req.params.id
  const discount = req.body.discount

  const product = await Product.findById(productId)

  if (!product) {
    return res.status(StatusCodes.NotFound).json({
      error: true,
      message: 'Product not found',
    })
  }

  product.discount = discount
  await product.save()

  return res.status(StatusCodes.OK).json({
    error: false,
    product: product,
  })
}

export default { updateProductDiscount }
