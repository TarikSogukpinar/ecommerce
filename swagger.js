import swaggerAutogen from "swagger-autogen";

const doc = {
    info: {
        title: 'E-commerce API',
        description: 'Description'
    },
    securityDefinitions: {
        apiKeyAuth: {
            type: 'apiKey',
            in: 'cookie', // can be 'header', 'query' or 'cookie'
            name: 'token', // name of the header, query parameter or cookie
            description: 'This is cookie based authentication'
        }
    },
    host: 'localhost:5000/api/v1'
};

const outputFile = './swagger-output.json';
const routes = ['./routes/*/*.routes.js'];

export default swaggerAutogen()(outputFile, routes, doc);
