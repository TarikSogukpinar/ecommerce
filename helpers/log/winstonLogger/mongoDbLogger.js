import winston from 'winston'
import dotenv from 'dotenv'
import moment from 'moment'

const dateTimeFormat = () => moment().format('YYYY-MM-DD hh:mm:ss').trim()

const envFile =
  process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development'
dotenv.config({
  path: envFile,
})

const logOptions = {
  filename: process.env.LOG_FILES_PATH,
  maxsize: 5242880, // 5MB
  maxFiles: 5,
  colorize: true,
}

const fileLogger = {
  jsonLogger: winston.createLogger({
    level: 'info',
    format: winston.format.combine(
      winston.format.timestamp({
        format: dateTimeFormat,
      }),
      winston.format.json(),
    ),
    transports: [new winston.transports.File(logOptions)],
  }),
}

export default fileLogger
