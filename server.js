const express = require("express");
// const uuid = require("uuid");

const port = 5000;
// const db = require("./database");

// Models:
const books = require("./models/books.model");

const app = express();

// Såhär kommer books-objektet se ut inne i arrayen
// let books = [];
/**
 * {
 * id: text,
 * title: text,
 * author: text,
 * genre: text
 * }
 */

// Middlewares för parsing.
app.use(express.json());

// Routes
// const booksRouter = express.Router();
// Ngt vajsing med routes...

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
  const foundBook = await books.getBook(wantedBook)

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

// // PUT /books/:id
// booksRouter.put("/books/:id", (req, res) => {
//   const foundBook = books.find((books) => books.id === req.params.id);

//   // Med dessa if-satser så blir PUT likadan som PATCH.
//   if (req.body.title) {
//     foundBook.title = req.body.title;
//   }
//   if (req.body.author) {
//     foundBook.author = req.body.author;
//   }
//   if (req.body.genre) {
//     foundBook.genre = req.body.genre;
//   }

//   res.json(books);
// });

// // PATCH /books/:id
// booksRouter.patch("/books/:id", (req, res) => {
//   // Hittat boken genom att jämföra idt i books-arrayen och i urlen.
//   const foundBook = books.find((books) => books.id === req.params.id);

//   if (req.body.title) {
//     foundBook.title = req.body.title;
//   }
//   if (req.body.author) {
//     foundBook.author = req.body.author;
//   }
//   if (req.body.genre) {
//     foundBook.genre = req.body.genre;
//   }

//   res.json(books);
// });

// // DELETE /books/:id
// booksRouter.delete("/books/:id", (req, res) => {
//   // Filtrerar bort boken som har det idt som stämmer överens med idt i urlen.
//   books = books.filter((books) => books.id !== req.params.id);
//   res.json(books);
// });

// app.use(booksRouter);

app.listen(port, () => {
  console.log(`Servern är igång i port ${port}.`);
});
