![Logo](https://i.ibb.co/vL92vfr/Ads-z-tasar-m-1.png)

# E-Commerce

E-commerce API built using NodeJS & MongoDB

Live Swagger Documantetion : https://ecommerce-production-node-app.up.railway.app/api-docs/


## Installation

git clone https://github.com/TarikSogukpinar/ecommerce.git

Node.js

```bash
  cd ecommerce
  npm install
  npm run dev:production & npm run dev:development
```

Docker

```bash
  cd ecommerce
  docker-compose up
```

## API Reference

#### Auth

```http
  POST /api/auth/login
```

```http
  POST /api/auth/register
```

```http
  GET /api/auth/logout
```

#### Admin

```http
  GET /api/admin/getAllusers
```

```http
  GET /api/admin/getUserById/${userId}
```

```http
  PUT /api/admin/updateUserById/${userId}
```

```http
  DELETE /api/admin/deleteUserById/${userId}
```

```http
  POST /api/admin/createNewUser
```

```http
  POST /api/admin/updateUserRole/${userId}
```

#### Cart

```http
  POST /api/cart/addToCartItem/${userId}/${productId}
```

```http
  GET /api/cart/getUserCart/${userId}
```

```http
  DELETE /api/cart/deleteCartItem/${userId}/${productId}
```

```http
  DELETE /api/cart/deleteUserCart/${userId}
```

#### Category

```http
  POST /api/category/createCategory
```

```http
  GET /api/category/searchCategory/${key}
```

```http
  GET /api/category/searchCategoryById/${categoryId}
```

```http
  PUT /api/category/updateCategoryById/${categoryId}
```

```http
  DELETE /api/category/deleteCategoryById/${categoryId}
```

#### Favorite

```http
  POST /api/favorite/addFavorite/${userId}/${productId}
```

```http
  GET /api/favorite/getFavoriteProducts/${userId}
```

```http
  DELETE /api/favorite/deleteFavorite/${userId}/${productId}
```

#### Order

```http
  POST /api/order/createOrder
```

```http
  GET /api/order/searchOrder/${orderStatus}
```

```http
  GET /api/order/getOrderById/${orderId}
```

```http
  PUT /api/order/updateOrder/${orderId}
```

```http
  PUT /api/order/cancelOrder/${orderId}
```

```http
  PUT /api/order/updateOrderStatus/${orderId}
```

#### Product

```http
  POST /api/product/createProduct
```

```http
  PUT /api/product/updateProduct/${productId}
```

```http
  GET /api/product/getAllProducts
```

```http
  GET /api/product/searchProducts/${key}
```

```http
  DELETE /api/product/deleteProductById/${productId}
```

```http
  GET /api/product/getProductById/${productId}
```

```http
  GET /api/product/getCheapestFiveProducts
```

```http
  GET /api/product/getExpensiveFiveProducts
```

```http
  GET /api/product/getRecentlyAddedProducts
```

#### User

```http
  PUT /api/user/updatePassword/${userId}
```

```http
  POST /api/user/reset-password
```

```http
  DELETE /api/user/reset-password/${userId}
```

**Other API services are still being developed**

## Built With

List of any major frameworks used to build the project.

[Node JS](https://nodejs.org/en) - JS runtime environment

[ExpressJS](https://expressjs.com/) - The NodeJS framework used

[MongoDB](https://www.mongodb.com/) - NoSQL Database uses JSON-like documents with optional schemas

[Mongoose](https://mongoosejs.com/) - Object Data Modeling (ODM) library for MongoDB and NodeJS

[Compression](https://www.npmjs.com/package/compression) - NodeJS compression middleware

[Joi](https://www.npmjs.com/package/joi) - The most powerful schema description language and data validator for JavaScript.

[Joi-password-complexity](https://www.npmjs.com/package/joi-password-complexity) - Creates a Joi object that validates password complexity.

[http-status-codes](https://www.npmjs.com/package/http-status-codes) -Constants enumerating the HTTP status codes. Based on the Java Apache HttpStatus API.

[Redis](https://www.npmjs.com/package/redis) - Node-redis is a modern, high performance Redis client for Node.js.

[Cors](https://www.npmjs.com/package/cors) - NodeJS package for providing a Connect/Express middleware that can be used to enable CORS with various options

[Express Mongo Sanitize ](https://www.npmjs.com/package/express-mongo-sanitize) - Express 4.x middleware which sanitizes user-supplied data to prevent MongoDB Operator Injection.

[Dotenv](https://www.npmjs.com/package/dotenv) - Loads environment variables from a . env file into process. env

[Rate Limiter](https://www.npmjs.com/package/express-rate-limit) - Basic IP rate-limiting middleware for Express

[Helmet](https://www.npmjs.com/package/helmet) Secure Express apps by setting various HTTP headers

[JWT](https://jwt.io/) Compact URL-safe means of representing claims to be transferred between two parties

[Moment](https://momentjs.com/) JavaScript library which helps is parsing, validating, manipulating and displaying date/time in JavaScript in a very easy way

[Multer](https://www.npmjs.com/package/multer) NodeJS middleware for handling multipart/form-data

[Nodemailer](https://www.npmjs.com/package/nodemailer) Easy as cake e-mail sending from your Node.js applications

[Faker.js](https://github.com/faker-js/faker) Generate massive amounts of fake (but realistic) data for testing and development.

[Jest](https://jestjs.io/) Delightful JavaScript Testing

[supertest](https://www.npmjs.com/package/supertest) The motivation with this module is to provide a high-level abstraction for testing HTTP, while still allowing you to drop down to the lower-level API provided by superagent.

[Winston](https://github.com/winstonjs/winston) A logger for just about everything.

[uuidv4](https://www.npmjs.com/package/uuidv4) uuidv4 creates v4 UUIDs.

[PM2](https://www.npmjs.com/package/pm2) PM2 is a production process manager for Node.js applications with a built-in load balancer. It allows you to keep applications alive forever, to reload them without downtime and to facilitate common system admin tasks.

## Environment Variables

To run this project, you will need to add the following environment variables to your .env.development & .env.production file

`MONGO_URI = yourmongodburl`

`PRIVATE_KEY  = yourprivatesecretkey`

`REDIS_HOST  = yourredishostconnectionurl`

## Roadmap

- Discount, Review, Support, Payment services will be written

- Tests will be written for all services

- Redis implementation will be done for a few services

- Swagger interface will be added and tested for all services

- Extend API's Functionality

- Logging will be added

- Some refactoring will be done & maybe bug fix

## Lessons Learned

In this application, I think I have improved myself in writing APIs that provide different services, and I believe I have learned to use technologies such as Redis and Docker. I learned more about Express.js and the general Node.js architecture. I started to have a deeper knowledge of Mongo db and error handling. I had the opportunity to use many new npm packages.

## Feedback

If you have any feedback, please reach out to me at tariksogukpinar@outlook.com
