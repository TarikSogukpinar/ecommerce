import swaggerAutogen from "swagger-autogen";
import dotenv from "dotenv";

const envFile =
    process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development'
dotenv.config({
    path: envFile,
})


const doc = {
    info: {
        title: 'E-commerce API',
        description: 'Description'
    },
    securityDefinitions: {
        apiKeyAuth: {
            type: 'apiKey',
            in: 'header', // can be 'header', 'query' or 'cookie'
            name: 'token', // name of the header, query parameter or cookie
            description: 'This is cookie based authentication'
        }
    },
    host: process.env.SWAGGER_HOST_URL,
    // host: 'localhost:5000/api/v1'
};

const outputFile = './swagger-output.json';
const routes = ['./routes/*/*.*.js'];

export default swaggerAutogen()(outputFile, routes, doc);
