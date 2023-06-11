import { faker } from '@faker-js/faker'
import Product from '../models/Product.js'
import User from '../models/User.js'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

const envFile =
  process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development'
dotenv.config({
  path: envFile,
})

async function createFakeData() {
  const connectionString = process.env.MONGO_URI
  await mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  try {
    for (let i = 0; i < 100; i++) {
      const user = new User({
        firstName: faker.person.fullName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        confirmPassword: faker.internet.password(),
        cart: [],
        roles: 'seller',
        createdData: faker.date.past(),
      })

      const product = new Product({
        productName: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price(),
        category: faker.commerce.department(),
        brand: faker.commerce.productMaterial(),
        inStock: faker.datatype.boolean(),
        inventory: faker.number.int(),
        rating: faker.number.int(),
        createdAt: faker.date.past(),
        userId: user._id,
      })

      await user.save()
      await product.save()
    }
    console.log('Data successfully created!')
    process.exit(1)
  } catch (error) {
    console.log(error)
  }
}

await createFakeData()
