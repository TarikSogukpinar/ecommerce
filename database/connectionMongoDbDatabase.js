import mongoose from 'mongoose'

const connectionDatabase = async () => {
  const connectionString = process.env.MONGO_URI
  try {
    mongoose
      .connect(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then((res) => console.log(`MongoDB Connected: ${res.connection.name}`))
      .catch((error) => {
        console.error(`Error: ${error.message}`)
        process.exit(1)
      })
  } catch (error) {
    console.error(`Error: ${error.message}`)
    process.exit(1)
  }
}

export default connectionDatabase
