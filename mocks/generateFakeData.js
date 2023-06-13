import { faker } from '@faker-js/faker'
import Product from '../models/Product.js'
import User from '../models/User.js'
import Category from '../models/Category.js'
import Order from '../models/Order.js'
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
    for (let i = 0; i < 500; i++) {
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
      const category = new Category({
        categoryName: faker.commerce.productAdjective(),
        categoryDescription: faker.commerce.productDescription(),
        createdAt: faker.date.past(),
      })

      const product = new Product({
        productName: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price(),
        category: category._id,
        brand: faker.commerce.productMaterial(),
        inStock: faker.datatype.boolean(),
        inventory: faker.number.int(),
        reviews: {
          user: faker.person.fullName(),
          review: faker.commerce.productDescription(),
        },
        rating: faker.number.int(),
        createdAt: faker.date.past(),
        userId: user._id,
      })

      const order = new Order({
        userId: user._id,
        customerName: faker.person.fullName(),
        orderItem: product._id,
        orderDate: faker.date.past(),
        address: {
          street: faker.location.streetAddress(),
          city: faker.location.city(),
          state: faker.location.state(),
          zip: faker.location.zipCode(),
        },
      })
      await category.save()
      await user.save()
      await product.save()
      await order.save()
    }
    console.log('Data successfully created!')
    process.exit(1)
  } catch (error) {
    console.log(error)
  }
}

await createFakeData()
