![Logo](https://i.ibb.co/vL92vfr/Ads-z-tasar-m-1.png)

# E-Commerce

E-commerce API built using NodeJS & MongoDB

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

#### Get all items

```http
  GET /api/items
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |

#### Get item

```http
  GET /api/items/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

#### add(num1, num2)

Takes two numbers and returns the sum.

## Built With

List of any major frameworks used to build the project.

[Node JS](https://nodejs.org/en) - JS runtime environment

[ExpressJS](https://expressjs.com/) - The NodeJS framework used

[MongoDB](https://www.mongodb.com/) - NoSQL Database uses JSON-like documents with optional schemas

[Mongoose](https://mongoosejs.com/) - Object Data Modeling (ODM) library for MongoDB and NodeJS

[Compression](https://www.npmjs.com/package/compression) - NodeJS compression middleware

[Cors](https://www.npmjs.com/package/cors) - NodeJS package for providing a Connect/Express middleware that can be used to enable CORS with various options

[Express Mongo Sanitize ](https://www.npmjs.com/package/express-mongo-sanitize) - Express 4.x middleware which sanitizes user-supplied data to prevent MongoDB Operator Injection.

[Dotenv](https://www.npmjs.com/package/dotenv) - Loads environment variables from a . env file into process. env

[Rate Limiter](https://www.npmjs.com/package/express-rate-limit) - Basic IP rate-limiting middleware for Express

[Helmet](https://www.npmjs.com/package/helmet) Secure Express apps by setting various HTTP headers

[JWT](https://jwt.io/) Compact URL-safe means of representing claims to be transferred between two parties

[Moment](https://momentjs.com/) JavaScript library which helps is parsing, validating, manipulating and displaying date/time in JavaScript in a very easy way

[Multer](https://www.npmjs.com/package/multer) NodeJS middleware for handling multipart/form-data

[Nodemailer](https://www.npmjs.com/package/nodemailer) Easy as cake e-mail sending from your Node.js applications
