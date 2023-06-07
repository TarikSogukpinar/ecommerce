import swaggerJsDoc from 'swagger-jsdoc'

const options = {
  definition: {
    openapi: '3.0.1',
    info: {
      title: 'E-commerce API',
      version: '1.0.0',
      description: 'Sample api documentation for an e-commerce application',
    },
  },
  apis: ['./routes/*.js', './routes/auth/auth.routes.js'],
}

const specs = swaggerJsDoc(options)

export default specs
