import swaggerJsDoc from 'swagger-jsdoc'

const options = {
  definition: {
    openapi: '3.0.1',
    info: {
      title: 'E-commerce API',
      version: '1.0.0',
      description: 'Sample api documentation for an e-commerce application',


    },
    host: 'https://ecommerce-production-node-app.up.railway.app/',
    swaggerUIPath: '/api-docs',
    apiDocsPath: '/api/v1/',

  },
  apis: ['./routes/*.js', './routes/auth/auth.routes.js', './routes/*/*.routes.js'],
}

const specs = swaggerJsDoc(options)

export default specs
