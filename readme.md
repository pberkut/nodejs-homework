# RESTful API NodeJS server application "contacts manager"

This this RESTful API Node.js server application "Contacts manager" with authorization. App deployed in render.com service.

API URL:
<https://nodejs-rest-api-backend-m9yr.onrender.com>

Detailed POSTMAN documentation:
<https://documenter.getpostman.com/view/22431847/2s93sabDLK>

## API Documentations & Endpoints

### Authorization user routes

```js
// POST. Signup user
/auth/register

// GET. Verify email
/auth/verify/:verificationToken

// POST. Resend verify email
/auth/verify

// POST. Signin user
/auth/login

// GET. Get current user
/auth/current

// PATCH. Update subscription user. Subscription items using variant: [starter, pro, business]
/auth/subscription

// PATCH. Upload avatar to user profile. Used API cloud storage Cloudinary
/auth/avatars

// POST. Logout user
/auth/logout
```

### Contacts rotes

Work with contacts through authorization.

```js
// GET. Get all contacts
/api/contacts

// GET. Get one contact by id
/api/contacts/:contactId

// POST. Create contact
/api/contacts

// PUT. Update contact
/api/contacts/:contactId

// PATCH. Update contact field "favorite"
/api/contacts/:contactId/favorite

// DELETE. Remove contact
/api/contacts/:contactId
```

## Manual Installation

```js
// Clone repository
git clone https://github.com/pberkut/nodejs-rest-api-backend.git .

// Install the dependencies
npm install

// Set the environment variable
// Open .env and modify the environment variables
cp .env.example .env

// Start the server in production mode
npm start

// Start the server in development mode
npm run start:dev

// Start the server in debugger mode
npm run debug
```

## Features

- NoSQL database: MongoDB object data modeling using Mongoose
- Authentication and authorization: using my-self code
- Validation: request data validation using Joi
- Logging: using morgan
- Testing: unit and integration tests using Jest
- Error handling: centralized error handling mechanism
- Environment variables: using dotenv
- CORS: Cross-Origin Resource-Sharing enabled using cors
- Docker support
- Linting: with ESLint and Prettier
- Cloudinary API: Used cloud storage Cloudinary
- Jimp: JavaScript Image Manipulation Program
- JWT: using jsonwebtoken with access and refresh token
- Sendgrid API: using a cloud-based SMTP provider
