import { AppError } from '../../errors/AppError.js'
import StatusCode from 'http-status-codes'
import fileLogger from '../../helpers/log/winstonLogger/mongoDbLogger.js'

// eslint-disable-next-line no-unused-vars
export const errorHandler = (error, req, res, next) => {
  if (error.name === 'ValidationError') {
    return res.status(StatusCode.BAD_REQUEST).json({
      type: 'ValidationError',
      details: error.details,
    })
  }

  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      type: error.errorCode,
      message: error.message,
    })
  }

  fileLogger.jsonLogger.add('Hey')
  return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
    error: true,
    message: 'Something went wrong',
    errorDetails: error.message,
  })
}
