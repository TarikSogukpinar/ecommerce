import express from 'express'
import authRoutes from './auth/auth.routes.js'
import userRoutes from './user/user.routes.js'
import productRoutes from './product/product.routes.js'

export function initRoutes(app) {
  app.use('/api/auth', authRoutes)
  app.use('/api/user', userRoutes)
  app.use('/api/product', productRoutes)

  app.all('*', (req, res) => {
    res.status(404).json({
      error: true,
      message: 'Route not found',
    })
  })
}
