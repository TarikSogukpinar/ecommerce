import request from 'supertest'
import mongoose from 'mongoose'
import app from '../../../app.js'
import dotenv from 'dotenv'

const envFile =
  process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development'
dotenv.config({
  path: envFile,
})

/* Connecting to the database before each test. */
beforeEach(async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
})

/* Closing database connection after each test. */
afterEach(async () => {
  //   await mongoose.connection.db.dropDatabase()
  await mongoose.connection.close()
})
let token;
describe('Product API', () => {
  it('should create a new product and return 201 status', async () => {
    const productData = {
      name: 'New Product',
      description: 'This is a new product',
      price: 100,
      // Add any other product fields you have...
    }

    const res = await request(app)
      .post('/api/products/createProducts') // Adjust this to your actual product creation endpoint
      .set('Authorization', `Bearer ${token}`) // Assuming you need a token for authorization
      .send(productData)

    expect(res.statusCode).toEqual(201)
    expect(res.body.name).toEqual(productData.name)
    expect(res.body.description).toEqual(productData.description)
    expect(res.body.price).toEqual(productData.price)
    // Continue for any other product fields...
  })
})
