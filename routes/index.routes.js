import authRoutes from './auth/auth.routes.js'
import userRoutes from './user/user.routes.js'
import productRoutes from './product/product.routes.js'
import cartRoutes from './cart/cart.routes.js'

export function initRoutes(app) {
  app.use('/api/auth', authRoutes)
  app.use('/api/user', userRoutes)
  app.use('/api/product', productRoutes)
  app.use('/api/cart', cartRoutes)
}
