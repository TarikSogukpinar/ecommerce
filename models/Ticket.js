import mongoose from 'mongoose'

const ticketSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    response: {
      type: String,
      required: false,
    },
  },
  { timestamps: true, versionKey: false },
)

const Ticket = new mongoose.model('user', ticketSchema)

export default Ticket
