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
- Admin-only user and item management
- RESTful API structure

> **Note 1**: The `isAdmin` flag is **not assigned automatically**. If you want a user to have admin privileges, you must manually set `isAdmin: true` for that user in the database.

> **Note 2**: The default MongoDB user credentials for connecting to the database are:
```
Username: Admin  
Password: Admin1234
```

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
   DB_URI=mongodb://Admin:Admin1234@localhost:27017/your-db
   SESSION_SECRET=yourSecretKey
   ```

---

## API endpoints (JSON-based)

All API endpoints accept and return JSON. Use the `Content-Type: application/json` header for requests.

### Authentication

- **Register**
  ```
  POST /api/users/register
  Body:
  {
    "username": "johndoe",
    "password": "123456"
  }
  ```

- **Login**
  ```
  POST /api/users/login
  Body:
  {
    "username": "johndoe",
    "password": "123456"
  }
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
  POST /api/users/getItemByName
  Body:
  {
    "name": "item name here"
  }
  ```

---

### Cart Operations

- **Add to Cart**
  ```
  POST /api/users/addToCart
  Body:
  {
    "name": "item name here",
    "quantity": 2
  }
  ```

- **View Cart**
  ```
  GET /api/users/getCart
  ```

- **Remove from Cart**
  ```
  POST /api/users/removeFromCart
  Body:
  {
    "name": "item name here"
  }
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

### Admin Endpoints

> These routes require the user to be logged in with `isAdmin = true`.

#### User Management

- **Get All Users**
  ```
  GET /api/admin/getAllUsers
  ```

- **Get a Specific User**
  ```
  POST /api/admin/getUser
  Body:
  {
    "username": "targetUsername"
  }
  ```

- **Delete a Specific User**
  ```
  DELETE /api/admin/deleteUser
  Body:
  {
    "username": "targetUsername"
  }
  ```

- **Delete All Users**
  ```
  DELETE /api/admin/deleteAllUsers
  ```

#### Item Management

- **Add New Item**
  ```
  POST /api/admin/addItem
  Body:
  {
    "name": "New Item",
    "price": 25.0,
    "quantity": 10,
    "category": "Electronics",
    "description": "High quality item"
  }
  ```

- **Update Existing Item**
  ```
  POST /api/admin/updateItem
  Body:
  {
    "name": "New Item",
    "update": {
      "price": 30.0,
      "quantity": 15,
      "description": "Updated description"
    }
  }
  ```

- **Delete an Item**
  ```
  DELETE /api/admin/deleteItem
  Body:
  {
    "name": "item name here"
  }
  ```

---
