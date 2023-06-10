//npm packages
import express from 'express'
import dotenv from 'dotenv'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import compression from 'compression'
import cors from 'cors'
import xss from 'xss-clean'
import mongoSanitize from 'express-mongo-sanitize'
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from './swaggerOptions.js'

//Custom Modules,Packages,Configs,Etc
import connectionMongoDbDatabase from './database/connectionMongoDbDatabase.js'
import corsOption from './helpers/cors/corsOption.js'
import { initRoutes } from './routes/index.routes.js'
import notFound from './errors/notFound.js'

const envFile =
  process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development'
dotenv.config({
  path: envFile,
})

const app = express()

app.use(express.json({ limit: '10kb' }))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(helmet())
app.use(compression())
app.use(xss())
app.use(mongoSanitize())
app.use(cors(corsOption))
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.disable('x-powered-by')
initRoutes(app)



app.use(notFound)
await connectionMongoDbDatabase()

export const PORT = process.env.PORT || 5000
export default app
