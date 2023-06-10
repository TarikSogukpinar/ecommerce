import Product from '../../models/Product.js'
import createProductValidationSchema from '../../validations/productValidations/createProductValidationSchema.js'
import updateProductValidationSchema from '../../validations/productValidations/updateProductValidationSchema.js'
import searchProductValidationSchema from '../../validations/productValidations/searchProductValidationSchema.js'
import { StatusCodes } from 'http-status-codes'

const getAllProducts = async (req, res) => {
  const page = Number(req.query.pageNumber) || 1
  const pageSize = 20
  const count = await Product.countDocuments()

  const allProducts = await Product.find({})
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .sort('-createdAt')
  res.json({
    products: allProducts,
    page,
    pages: Math.ceil(count / pageSize),
    total: count,
  })
}

const createProduct = async (req, res) => {
  const { error } = createProductValidationSchema(req.body)

  if (error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: true, message: error.details[0].message })
  }

  req.body.userId = req.user.userId
  const product = new Product(req.body)

  const savedProduct = await product.save()

  res.status(StatusCodes.OK).json({
    error: false,
    message: 'Product Created Succesfully!',
    savedProduct: savedProduct,
  })
}

const updateProduct = async (req, res) => {
  const { error } = updateProductValidationSchema(req.body)

  if (error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: true, message: error.details[0].message })
  }

  const productId = req.params.id
  const updatedProductData = req.body

  const updatedProduct = await Product.findOneAndUpdate(
    { _id: productId },
    updatedProductData,
    { new: true },
  )

  if (!updatedProduct) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ error: true, message: 'Product not found!' })
  }

  res.status(StatusCodes.OK).json({
    error: false,
    message: 'Product updated successfully!',
    updatedProduct: updatedProduct,
  })
}

const searchProducts = async (req, res) => {
  //search on progress

  const { error } = searchProductValidationSchema(req.query)

  if (error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: true, message: error.details[0].message })
  }

  let query = {}

  const products = await Product.find(query)

  if (products.length === 0) {
    return res.status(StatusCodes.NOT_FOUND).json({
      error: true,
      message: 'No products found matching the provided query parameters!',
    })
  }

  res.status(StatusCodes.OK).json({
    error: false,
    products: products,
  })
}

export default { getAllProducts, createProduct, updateProduct, searchProducts }
