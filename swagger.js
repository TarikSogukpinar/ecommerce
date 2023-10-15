import swaggerAutogen from "swagger-autogen";

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
    host: process.env.NODE_ENV === 'production' ? 'https://ecommerce-production-node-app.up.railway.app/api/v1' : 'http://localhost:5000/api/v1',
    // host: 'localhost:5000/api/v1'
};

const outputFile = './swagger-output.json';
const routes = ['./routes/*/*.*.js'];

export default swaggerAutogen()(outputFile, routes, doc).then(async () => {
    await import('./index.js');
});
