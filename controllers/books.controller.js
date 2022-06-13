// Models:
const books = require("../models/books.model");

async function getBooks(req, res) {
  const result = await books.getAllBooks();

  res.json(result);
}

async function getBook(req, res) {
  const wantedBook = req.params.id;
  const foundBook = await books.getBook(wantedBook);

  if (!foundBook) {
    return res.status(400).send(`Book doesn't exist`);
  }
  res.json(foundBook);
}

async function postBook(req, res) {
  const { title, author, genre } = req.body;

  if (!title || !author || !genre) {
    return res.status(400).send("You need to send title, author and genre.");
  }
  const newBook = {
    title,
    author,
    genre,
  };

  await books.addBook(newBook);

  res.json(newBook);
}

async function putBook(req, res) {
  const { title, author, genre } = req.body;
  const wantedBook = req.params.id;

  if (!title || !author || !genre) {
    return res.status(400).send("You need to send title, author and genre.");
  }

  const putBook = {
    title,
    author,
    genre,
  };

  await books.putBook(wantedBook, putBook);
  res.json(putBook);
}

async function patchBook(req, res) {
  const { title } = req.body;

  if (!title) {
    return res.status(400).send("You need to send a new title!");
  }

  const wantedBook = req.params.id;
  const patchBook = await books.patchBook(wantedBook, title);

  res.json(patchBook);
}

async function deleteBook(req, res) {
  const wantedBook = req.params.id;
  const foundBook = await books.getBook(wantedBook);
  const deletedBook = await books.deleteBook(wantedBook);
    if (foundBook) {
      return res.status(200).send("Book deleted");
    } else {
      return res.status(400).send(`Book doesn't exist`);
    }
  res.json(deletedBook);
}

module.exports = {
  getBooks,
  getBook,
  postBook,
  putBook,
  patchBook,
  deleteBook,
};
