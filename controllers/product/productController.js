import Product from '../../models/Product.js'
import Category from '../../models/Category.js'
import createProductValidationSchema from '../../validations/productValidations/createProductValidationSchema.js'
import updateProductValidationSchema from '../../validations/productValidations/updateProductValidationSchema.js'
import searchProductValidationSchema from '../../validations/productValidations/searchProductValidationSchema.js'
import {StatusCodes} from 'http-status-codes'
import {initRedisClient} from '../../helpers/cache/redisCache.js'

const redisClient = await initRedisClient()

const getAllProducts = async (req, res) => {
    const page = Number(req.query.pageNumber) || 1
    const pageSize = 20
    const count = await Product.countDocuments()


    let product = await redisClient.get(`products:${page}`)


    if (product) {
        return res.status(StatusCodes.OK).json({
            error: false,
            products: JSON.parse(product),
            source: 'cache',
        })
    }

    const allProducts = await Product.find({})
        .limit(pageSize)
        .skip(pageSize * (page - 1))
        .sort('-createdAt')

    if (allProducts.length === 0) {
        return res.status(StatusCodes.NOT_FOUND).json({
            error: true,
            message: 'Products not found!',
        })
    }

    await redisClient.set(
        `products:${page}`,
        JSON.stringify(allProducts),
        'EX',
        3600,
    )

    return res.json({
        error: false,
        products: allProducts,
        page,
        pages: Math.ceil(count / pageSize),
        total: count,
        source: 'database',
    })
}

const getProductById = async (req, res) => {
    const id = req.params.id

    let product = await redisClient.get(`product:${id}`)
    if (product) {
        return res.status(StatusCodes.OK).json({
            source: 'cache',
            error: false,
            product: JSON.parse(product),
        })
    }

    product = await Product.findById(id).orFail(new Error('Product not found!'))
    if (product) {
        await redisClient.set(`product:${id}`, JSON.stringify(product), 'EX', 3600) // 1 hour cache
        return res.status(StatusCodes.OK).json({
            source: 'database',
            error: false,
            product: product,
        })
    } else {
        return res.status(StatusCodes.NOT_FOUND).json({
            error: true,
            message: 'Product not found!',
        })
    }
}

const deleteProductById = async (req, res) => {
    const id = req.params.id

    const product = await Product.findByIdAndDelete(id)

    if (product) {
        return res
            .status(StatusCodes.OK)
            .json({error: false, message: 'Product deleted successfully!'})
    }
    return res
        .status(StatusCodes.NOT_FOUND)
        .json({error: true, message: 'Product not found!'})
}

const createProduct = async (req, res) => {
    const {error} = createProductValidationSchema(req.body)

    if (error) {
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json({error: true, message: error.details[0].message})
    }

    const categoryName = req.body.category

    const category = await Category.findOne({categoryName: categoryName})

    if (!category) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            error: true,
            message: 'Category not found',
        })
    }

    req.body.userId = req.user.userId
    req.body.category = category._id
    const product = new Product(req.body)

    const savedProduct = await product.save()

    return res.status(StatusCodes.OK).json({
        error: false,
        message: 'Product Created Successfully!',
        savedProduct: savedProduct,
    })
}

const updateProduct = async (req, res) => {
    const {error} = updateProductValidationSchema(req.body)

    if (error) {
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json({error: true, message: error.details[0].message})
    }

    const productId = req.params.id
    const updatedProductData = req.body

    const updatedProduct = await Product.findOneAndUpdate(
        {_id: productId},
        updatedProductData,
        {new: true},
    )

    if (!updatedProduct) {
        return res
            .status(StatusCodes.NOT_FOUND)
            .json({error: true, message: 'Product not found!'})
    }

    return res.status(StatusCodes.OK).json({
        error: false,
        message: 'Product updated successfully!',
        updatedProduct: updatedProduct,
    })
}

const searchProducts = async (req, res) => {
    const {error} = searchProductValidationSchema(req.query)

    if (error) {
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json({error: true, message: error.details[0].message})
    }

    const category = await Category.find({
        categoryName: {$regex: new RegExp(req.params.key, 'i')},
    })
    const categoryIds = category.map((category) => category._id)

    let products = await Product.find({
        $or: [
            {productName: {$regex: new RegExp(req.params.key, 'i')}},
            {description: {$regex: new RegExp(req.params.key, 'i')}},
            {category: {$in: categoryIds}},
            {brand: {$regex: new RegExp(req.params.key, 'i')}},
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
    const product = await Product.find({}).sort({price: 1}).limit(5)

    if (product) {
        return res.status(StatusCodes.OK).json({error: false, product: product})
    }

    return res.status(StatusCodes.OK).json({
        error: false,
        products: product,
    })
}

const getExpensiveFiveProducts = async (req, res) => {
    const product = await Product.find({}).sort({price: -1}).limit(5)

    if (product) {
        return res.status(StatusCodes.OK).json({error: false, product: product})
    }

    return res.status(StatusCodes.OK).json({
        error: false,
        products: product,
    })
}

const getRecentlyAddedProducts = async (req, res) => {
    const product = await Product.find({}).sort({createdAt: -1}).limit(10)

    if (product) {
        return res.status(StatusCodes.OK).json({error: false, product: product})
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
    getRecentlyAddedProducts,
}
