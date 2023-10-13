import authRoutes from './auth/auth.routes.js'
import userRoutes from './user/user.routes.js'
import productRoutes from './product/product.routes.js'
import cartRoutes from './cart/cart.routes.js'
import adminRoutes from './admin/admin.routes.js'
import categoryRoutes from './category/category.routes.js'
import orderRoutes from './order/order.routes.js'
import favoriteRoutes from './favorite/favorite.routes.js'
import supportRoutes from './support/support.routes.js'
import discountRoutes from './discount/discount.routes.js'
import reviewRoutes from './review/review.routes.js'

export function initRoutes(app) {
  app.use('/api/v1/auth', authRoutes)
  app.use('/api/v1/user', userRoutes)
  app.use('/api/v1/product', productRoutes)
  app.use('/api/v1/cart', cartRoutes)
  app.use('/api/v1/admin', adminRoutes)
  app.use('/api/v1/category', categoryRoutes)
  app.use('/api/v1/order', orderRoutes)
  app.use('/api/v1/favorite', favoriteRoutes)
  app.use('/api/v1/support', supportRoutes)
  app.use('/api/v1/discount', discountRoutes)
  app.use('/api/v1/review', reviewRoutes)
}
