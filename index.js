import app from './app.js'
import { PORT } from './app.js'
import connectionMongoDbDatabase from './database/connectionMongoDbDatabase.js'

app.listen(PORT, async () => {
  await connectionMongoDbDatabase()
  console.log('Server is running on port: ' + PORT)
})
