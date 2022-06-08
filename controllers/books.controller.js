// Models:
const books = require("../models/books.model");

async function getBooks(req, res) {
  const result = await books.getAllBooks();

  res.json(result);
}

async function getBook(req, res) {
  const wantedBook = req.params.id;
  const foundBook = await books.getBook(wantedBook);

  res.json(foundBook);
}

async function postBook(req, res) {
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
}

async function putBook(req, res) {
  const { title, author, genre } = req.body;
  const wantedBook = req.params.id;
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

  const wantedBook = req.params.id;
  const patchBook = await books.patchBook(wantedBook, title);

  res.json(patchBook);
}

async function deleteBook(req, res) {
  const wantedBook = req.params.id;
  const deletedBook = await books.deleteBook(wantedBook);

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
