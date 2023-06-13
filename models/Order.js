import mongoose from 'mongoose'
import moment from 'moment'

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    customerName: {
      type: String,
      required: true,
    },
    orderItem: {
      type: String,
      required: true,
    },
    orderDate: {
      type: String,
      default: moment().format('MMMM Do YYYY, h:mm:ss a'),
    },
    status: {
      type: String,
      enum: ['Processing', 'Shipped', 'Delivered'],
      default: 'Processing',
    },
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String },
      zip: { type: String, required: true },
    },
    createdAt: {
      type: String,
      default: moment().format('MMMM Do YYYY, h:mm:ss a'),
    },
  },
  { timestamps: true, versionKey: false },
)

const Order = new mongoose.model('Order', orderSchema)

export default Order
