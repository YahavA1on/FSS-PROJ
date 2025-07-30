# FSS-PROJ
## Creators
This project was made by Liam Israel and Yahav Alon.

# Node.js Starter Project

## Overview
This project is a starter backend template built with **Node.js**, **Express**, and **MongoDB**. It features a modular architecture with clearly separated folders for controllers, routes, models, services, and utilities.

It includes:
- User authentication (register, login, logout)
- Shopping cart management
- Item listing and querying
- Simple session handling
- RESTful API structure

---

## Project structure

```
├── app.js                # Main app entry point
├── server.js             # Server configuration
├── routes/               # Express routes
├── controllers/          # Route handlers
├── models/               # Mongoose models
├── services/             # External service integration
├── utiles/               # Utility functions (logging, tokens, hashing, etc.)
├── config/               # Environment config
├── .env                  # Environment variables
├── package.json
```

---

## Setup instructions

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Run the development server**
   ```bash
   npm run dev
   ```

> Alternatively, you can use `npm start` if no `dev` script exists.

3. **Environment setup**
   Create a `.env` file in the root with the following keys:
   ```
   PORT=3000
   DB_URI=mongodb://localhost:27017/your-db
   SESSION_SECRET=yourSecretKey
   ```

---

## API endpoints

### Authentication

- **Register**
  ```
  POST /api/users/register
  Body: { "username": "johndoe", "password": "123456" }
  ```

- **Login**
  ```
  POST /api/users/login
  Body: { "username": "johndoe", "password": "123456" }
  ```

- **Logout**
  ```
  POST /api/users/logout
  ```

---

### Item Management

- **Get All Items**
  ```
  GET /api/users/getAllItems
  ```

- **Get Item by Name**
  ```
  GET /api/users/getItemByName?name=itemName
  ```

---

### Cart Operations

- **Add to Cart**
  ```
  GET /api/users/addToCart?item=itemId
  ```

- **View Cart**
  ```
  GET /api/users/getCart
  ```

- **Remove from Cart**
  ```
  POST /api/users/removeFromCart
  Body: { "itemId": "item_id_here" }
  ```

- **Clear Cart**
  ```
  POST /api/users/clearCart
  ```

- **Order Cart**
  ```
  POST /api/users/orderCart
  ```

---

## Postman Collection

You can use Postman to test all endpoints. If needed, export a Postman collection and include it here.
