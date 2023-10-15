import swaggerAutogen from 'swagger-autogen'
import dotenv from 'dotenv'

const envFile =
    process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development'
dotenv.config({
    path: envFile,
})

const doc = {
    info: {
        title: 'E-commerce API',
        description: 'API Documentation for E-commerce',
    },
    securityDefinitions: {
        apiKeyAuth: {
            type: 'apiKey',
            in: 'header',
            name: 'token',
            description: 'This is cookie based authentication',
        },
    },
    components: {
        schemas: {
            User: {
                type: 'object',
                properties: {
                    firstName: {
                        type: 'string',
                    },
                    lastName: {
                        type: 'string',
                    },
                    email: {
                        type: 'string',
                    },
                    password: {
                        type: 'string',
                    },
                    confirmPassword: {
                        type: 'string',
                    },
                },
                required: ['id', 'firstName', 'lastName', 'email'],
            },
        },

    },
    schemes: ['http', 'https'],
    host: process.env.SWAGGER_HOST_URL,
}

const outputFile = './swagger-output.json'
const routes = ['./routes/*/*.*.js']

export default swaggerAutogen()(outputFile, routes, doc)
