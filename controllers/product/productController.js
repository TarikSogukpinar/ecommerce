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
  return res.json({
    products: allProducts,
    page,
    pages: Math.ceil(count / pageSize),
    total: count,
  })
}

const getProductById = async (req, res) => {
  const id = req.params.id
  const product = await Product.findById(id)

  if (product) {
    return res.status(StatusCodes.OK).json({ error: false, product: product })
  }
  return res
    .status(StatusCodes.NOT_FOUND)
    .json({ error: true, message: 'Product not found!' })
}

const deleteProductById = async (req, res) => {
  const id = req.params.id

  const product = await Product.findByIdAndDelete(id)

  if (product) {
    return res
      .status(StatusCodes.OK)
      .json({ error: false, message: 'Product deleted successfully!' })
  }
  return res
    .status(StatusCodes.NOT_FOUND)
    .json({ error: true, message: 'Product not found!' })
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

  return res.status(StatusCodes.OK).json({
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

  return res.status(StatusCodes.OK).json({
    error: false,
    message: 'Product updated successfully!',
    updatedProduct: updatedProduct,
  })
}


const searchProducts = async (req, res) => {
  const { error } = searchProductValidationSchema(req.query)

  if (error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: true, message: error.details[0].message })
  }

  let products = await Product.find({
    $or: [
      { productName: { $regex: req.params.key } },
      { description: { $regex: req.params.key } },
      { category: { $regex: req.params.key } },
      { brand: { $regex: req.params.key } },
    ],
  })

  if (products.length === 0) {
    return res.status(StatusCodes.NOT_FOUND).json({
      error: true,
      message: 'No products found matching the provided query parameters!',
    })
  }

  return res.status(StatusCodes.OK).json({
    error: false,
    products: products,
  })
}

const getCheapestFiveProducts = async (req, res) => {
  const product = await Product.find({}).sort({ price: 1 }).limit(5)

  if (product) {
    return res.status(StatusCodes.OK).json({ error: false, product: product })
  }

  return res.status(StatusCodes.OK).json({
    error: false,
    products: product,
  })
}

const getExpensiveFiveProducts = async (req, res) => {
  const product = await Product.find({}).sort({ price: -1 }).limit(5)

  if (product) {
    return res.status(StatusCodes.OK).json({ error: false, product: product })
  }

  return res.status(StatusCodes.OK).json({
    error: false,
    products: product,
  })
}

export default {
  getProductById,
  getAllProducts,
  createProduct,
  updateProduct,
  searchProducts,
  deleteProductById,
  getCheapestFiveProducts,
  getExpensiveFiveProducts,
}
