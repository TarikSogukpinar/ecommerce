import mongoose from 'mongoose'
import moment from 'moment'

const paymentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  amount: {
    type: Number,
    require: true,
  },
  cardNumber: {
    type: String,
    require: true,
    unique: true,
  },
  expireDate: {
    type: String,
    require: true,
    unique: true,
  },
  cvv: {
    type: String,
    require: true,
  },
  createdAt: {
    type: String,
    default: moment().format('MMMM Do YYYY, h:mm:ss a'),
  },
  updatedAt: {
    type: String,
    default: () => moment().format('MMMM Do YYYY, h:mm:ss a'),
  },
})

const Payment = new mongoose.model('Payment', paymentSchema)

export default Payment
