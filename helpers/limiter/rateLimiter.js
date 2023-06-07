import rateLimit from 'express-rate-limit'

const initLimit = (app) => {
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 100,
      message:
        'Too many accounts created from this IP, please try again after an hour',
      standardHeaders: true,
      legacyHeaders: false,
    }),
  )
}

export default initLimit
