// lägga in i controllers
// statuskoder

const express = require("express");
const port = 5000;

// Models:
const books = require("./models/books.model");

// Controllers:
const booksController = require("./controllers/books.controller");

const app = express();

// Middlewares för parsing.
app.use(express.json());

// Fungerar
// GET /books
app.get("/books", booksController.getBooks);

// Fungerar
// GET /books/:id
app.get("/books/:id", booksController.getBook);

// Fungerar
// POST /books
app.post("/books", booksController.postBook);

// Fungerar
// PUT /books/:id
app.put("/books/:id", booksController.putBook);

// Fungerar
// PATCH /books/:id
app.patch("/books/:id", booksController.patchBook);

// Fungerar
// DELETE /books/:id
app.delete("/books/:id", booksController.deleteBook);

app.listen(port, () => {
  console.log(`Servern är igång i port ${port}.`);
});
