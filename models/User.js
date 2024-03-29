import mongoose from 'mongoose'
import moment from 'moment'

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    confirmPassword: { type: String, required: true },
    roles: {
      type: String,
      default: 'user',
      enum: ['user', 'seller', 'admin', 'superadmin', 'support'],
    },
    cart: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
    ],
    favorites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
    ],
    createdAt: {
      type: String,
      default: moment().format('MMMM Do YYYY, h:mm:ss a'),
    },
  },
  { timestamps: true, versionKey: false },
)

const User = new mongoose.model('user', userSchema)

export default User
