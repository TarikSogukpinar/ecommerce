import { faker } from '@faker-js/faker'
import Product from '../models/Product.js'
import User from '../models/User.js'
import mongoose from 'mongoose'

async function createFakeData() {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  for (let i = 0; i < 200; i++) {
    const user = new User({
      firstName: faker.person.fullName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      confirmPassword: faker.internet.password(),
      roles: 'seller',
      createdData: faker.date.past(),
    })

    try {
      await user.save()
    } catch (error) {
      console.log('Error: ', error)
    }

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

    try {
      await product.save()
    } catch (error) {
      console.log('Error: ', error)
    }
  }
}

await createFakeData()
