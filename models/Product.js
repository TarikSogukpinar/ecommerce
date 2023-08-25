import mongoose from 'mongoose'
import moment from 'moment'
import uuidv4 from 'uuid'

const productSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    productId: {
      type: String,
      default: uuidv4,
      unique: true,
    },
    productName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    discount: {
      type: Number,
      default: 0,
    },
    brand: {
      type: String,
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    inventory: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        comment: {
          type: String,
          required: true,
        },
        rating: {
          type: Number,
          required: true,
        },
      },
    ],
    createdAt: {
      type: String,
      default: moment().format('MMMM Do YYYY, h:mm:ss a'),
    },
  },
  { timestamps: true, versionKey: false },
)

const Product = new mongoose.model('Product', productSchema)

export default Product
