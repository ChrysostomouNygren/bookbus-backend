const express = require("express");
const uuid = require("uuid");

const port = 5000;
const app = express();
const db = require("./database");

// Såhär kommer books-objektet se ut inne i arrayen
let books = [];
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

const booksRouter = express.Router();

// GET /books
booksRouter.get("/books", (req, res) => {
  const sql = "SELECT * FROM books";
  const params = [];

  //   db.all(sql, params, (error, rows) => {
  //     // vid ev fel:
  //     if (error) {
  //       console.error(error.message);
  //       res.status(400).json({ error: error.message });
  //     }
  //     // vid lyckad nedhämtning skickas ett meddelande om detta, samt så skickas datan in i rows:
  //     res.json({
  //       message: "Lyckans dagar!",
  //       data: rows,
  //     });
  //     // Här får jag bara in ovanstående, istället för boken jag skapat i database.js.... Why?
  //   });
  res.json(books);
});

// GET /books/:id
booksRouter.get("/books/:id", (req, res) => {
  // Jämför böckernas idn i arrayen books med idt i urlen.
  const foundBook = books.find((books) => books.id === req.params.id);
  res.json(foundBook);
});

// POST /books
booksRouter.post("/books", (req, res) => {
  books.push({
    id: uuid.v4(),
    title: req.body.title,
    author: req.body.author,
    genre: req.body.genre,
  });

  res.json(books);
});

// PUT /books/:id
booksRouter.put("/books/:id", (req, res) => {
  const foundBook = books.find((books) => books.id === req.params.id);

  // Med dessa if-satser så blir PUT likadan som PATCH.
  if (req.body.title) {
    foundBook.title = req.body.title;
  }
  if (req.body.author) {
    foundBook.author = req.body.author;
  }
  if (req.body.genre) {
    foundBook.genre = req.body.genre;
  }

  res.json(books);
});

// PATCH /books/:id
booksRouter.patch("/books/:id", (req, res) => {
  // Hittat boken genom att jämföra idt i books-arrayen och i urlen.
  const foundBook = books.find((books) => books.id === req.params.id);

  if (req.body.title) {
    foundBook.title = req.body.title;
  }
  if (req.body.author) {
    foundBook.author = req.body.author;
  }
  if (req.body.genre) {
    foundBook.genre = req.body.genre;
  }

  res.json(books);
});

// DELETE /books/:id
booksRouter.delete("/books/:id", (req, res) => {
  // Filtrerar bort boken som har det idt som stämmer överens med idt i urlen.
  books = books.filter((books) => books.id !== req.params.id);
  res.json(books);
});

app.use(booksRouter);

app.listen(port, () => {
  console.log(`Servern är igång i port ${port}.`);
});
