import mongoose from 'mongoose'
import moment from 'moment'

const categorySchema = new mongoose.Schema(
  {
    categoryName: {
      type: String,
      required: true,
      unique: true,
    },
    categoryDescription: {
      type: String,
    },
    createdAt: {
      type: String,
      default: moment().format('MMMM Do YYYY, h:mm:ss a'),
    },
  },
  { timestamps: true, versionKey: false },
)

const Category = new mongoose.model('Category', categorySchema)

export default Category
