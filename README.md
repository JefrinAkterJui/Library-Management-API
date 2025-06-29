

# 📚 Library Management API

A robust Library Management System built with **Express**, **TypeScript**, and **MongoDB (Mongoose)**. This API allows you to manage books, handle borrowing logic, and get borrow summaries with strict validation, business rules, and clean error handling.

---

## 🚀 Features

- **Book Management:** Create, read, update, and delete books with full schema validation.
- **Borrowing Logic:** Borrow books with business rules (availability, quantity, due date).
- **Aggregation:** Get a summary of borrowed books using MongoDB aggregation pipeline.
- **Filtering & Sorting:** Filter books by genre, sort and limit results.
- **Mongoose Middleware:** Automatic availability control and business logic enforcement.
- **Consistent Error Handling:** All errors follow a strict, descriptive format.

---

## 🧰 Tech Stack

- **Backend:** Express.js, TypeScript
- **Database:** MongoDB (Mongoose)
- **Other:** CORS, dotenv

---

## ⚙️ Setup

1. **Clone the repository:**
   ```bash
   git clone <repo-url>
   cd Library-Management-API
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment:**
   Create a `.env` file in the root:
   ```
   PORT=8080
   MONGO_URI=mongodb://localhost:27017/libraryManagementSystem
   ```

4. **Run the server:**
   ```bash
   npm run dev
   ```
   The API will be available at [http://localhost:8080](http://localhost:8080).

---

## 📖 API Endpoints

### Book Endpoints

#### 1. Create Book
- **POST** `/api/books`
- **Request Body:**
  ```json
  {
    "title": "The Theory of Everything",
    "author": "Stephen Hawking",
    "genre": "SCIENCE",
    "isbn": "9780553380163",
    "description": "An overview of cosmology and black holes.",
    "copies": 5,
    "available": true
  }
  ```
- **Success Response:**
  ```json
  {
    "success": true,
    "message": "Book created successfully",
    "data": { ... }
  }
  ```

#### 2. Get All Books
- **GET** `/api/books`
- **Query Parameters:**
  - `filter`: Filter by genre (e.g., `SCIENCE`)
  - `sortBy`: Field to sort by (default: `createdAt`)
  - `sort`: `asc` or `desc` (default: `desc`)
  - `limit`: Number of results (default: 10)
- **Success Response:**
  ```json
  {
    "success": true,
    "message": "Books retrieved successfully",
    "data": [ ... ]
  }
  ```

#### 3. Get Book by ID
- **GET** `/api/books/:bookId`
- **Success Response:**
  ```json
  {
    "success": true,
    "message": "Book retrieved successfully",
    "data": { ... }
  }
  ```

#### 4. Update Book
- **PUT** `/api/books/:bookId`
- **Request Body:** (any updatable fields)
- **Success Response:**
  ```json
  {
    "success": true,
    "message": "Book updated successfully",
    "data": { ... }
  }
  ```

#### 5. Delete Book
- **DELETE** `/api/books/:bookId`
- **Success Response:**
  ```json
  {
    "success": true,
    "message": "Book deleted successfully",
    "data": null
  }
  ```

---

### Borrow Endpoints

#### 6. Borrow a Book
- **POST** `/api/borrow`
- **Request Body:**
  ```json
  {
    "book": "ObjectId",
    "quantity": 2,
    "dueDate": "2025-07-18T00:00:00.000Z"
  }
  ```
- **Success Response:**
  ```json
  {
    "success": true,
    "message": "Book borrowed successfully",
    "data": { ... }
  }
  ```

#### 7. Borrowed Books Summary (Aggregation)
- **GET** `/api/borrow`
- **Success Response:**
  ```json
  {
    "success": true,
    "message": "Borrowed books summary retrieved successfully",
    "data": [
      {
        "book": {
          "title": "The Theory of Everything",
          "isbn": "9780553380163"
        },
        "totalQuantity": 5
      }
    ]
  }
  ```

---

## ❗ Error Response Format

All errors follow this structure:
```json
{
  "message": "Validation failed",
  "success": false,
  "error": { ... }
}
```
- Validation errors, 404s, and server errors are all handled with clear messages and details.

---

## 🗂️ Project Structure

```
src/
  app/
    controllers/
    interface/
    models/
    routes/
  config/
  app.ts
  server.ts
```

---

## 🧠 Business Logic & Validation

- **Book:** All fields validated, genre restricted to allowed values, ISBN unique, copies non-negative.
- **Borrow:** Checks for book existence and available copies, due date must be in the future.
- **Automatic:** Book availability is updated automatically when copies reach zero.
- **Aggregation:** Borrow summary uses MongoDB aggregation pipeline.

---

## 🧹 Scripts

- `npm run dev` – Start dev server with hot reload
- `npm run build` – Compile TypeScript to JavaScript
- `npm start` – Run the compiled server

---

## 📺 Video & Deployment

- [ ] Video explanation: _Add your public video link here_
- [ ] Live deployment: _Add your live deployment link here_

---

## 📝 License

This project is for educational purposes.

#   L i b r a r y - M a n a g e m e n t - A P I 
 
 
