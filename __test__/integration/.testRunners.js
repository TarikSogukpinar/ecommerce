import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config({
  path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development'
})

beforeEach(async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
})

afterEach(async () => {
  await mongoose.connection.close()
})