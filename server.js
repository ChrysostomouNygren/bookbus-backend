// avinstallera uuid
// lägga in i controllers



const express = require("express");
const port = 5000;

// Models:
const books = require("./models/books.model");

const app = express();


// Middlewares för parsing.
app.use(express.json());


// Fungerar
// GET /books
app.get("/books", async (req, res) => {
  const result = await books.getAllBooks();

  res.json(result);
});

// Fungerar
// GET /books/:id
app.get("/books/:id", async (req, res) => {
  const wantedBook = req.params.id;
  const foundBook = await books.getBook(wantedBook);

  res.json(foundBook);
});

// Fungerar
// POST /books
app.post("/books", async (req, res) => {
  const { title, author, genre } = req.body;

  if (!title || !author || !genre) {
    return res.status(400).send("Något gick fel!");
  }

  const newBook = {
    title,
    author,
    genre,
  };

  await books.addBook(newBook);

  res.json(newBook);
});

// Fungerar
// PUT /books/:id
app.put("/books/:id", async (req, res) => {
  const { title, author, genre } = req.body;
  const wantedBook = req.params.id;
  const putBook = {
    title,
    author,
    genre,
  };

  await books.putBook(wantedBook, putBook);
  res.json(putBook);
});

// Fungerar
// PATCH /books/:id
app.patch("/books/:id", async (req, res) => {
  const { title } = req.body;

  const wantedBook = req.params.id;
  const patchBook = await books.patchBook(wantedBook, title);

  res.json(patchBook);
});

// Fungerar
// DELETE /books/:id
app.delete("/books/:id", async (req, res) => {
  const wantedBook = req.params.id;
  const deletedBook = await books.deleteBook(wantedBook);

  res.json(deletedBook);
});

app.listen(port, () => {
  console.log(`Servern är igång i port ${port}.`);
});
