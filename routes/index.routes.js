import authRoutes from './auth/auth.routes.js'
import userRoutes from './user/user.routes.js'
import productRoutes from './product/product.routes.js'
import cartRoutes from './cart/cart.routes.js'
import adminRoutes from './admin/admin.routes.js'
import categoryRoutes from './category/category.routes.js'
import orderRoutes from './order/order.routes.js'
import favoriteRoutes from './favorite/favorite.routes.js'

export function initRoutes(app) {
  app.use('/api/auth', authRoutes)
  app.use('/api/user', userRoutes)
  app.use('/api/product', productRoutes)
  app.use('/api/cart', cartRoutes)
  app.use('/api/admin', adminRoutes)
  app.use('/api/category', categoryRoutes)
  app.use('/api/order', orderRoutes)
  app.use('/api/favorite', favoriteRoutes)
}
