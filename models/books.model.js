const res = require("express/lib/response");
const db = require("../database");

// GET /books
function getAllBooks() {
  const sql = "SELECT * FROM books";

  return new Promise((resolve, reject) => {
    db.all(sql, (error, rows) => {
      if (error) {
        console.error(error.message);
        res.status(400);
        reject(error);
      }
      res.status(200);
      resolve(rows);
    });
  });
}

// GET /books/:id
function getBook(id) {
  const sql = "SELECT * FROM books WHERE id = ?";

  return new Promise((resolve, reject) => {
    db.get(sql, id, (error, rows) => {
      if (error) {
        console.error(error.message);
        res.status(400);
        reject(error);
      }
      res.status(200);
      resolve(rows);
    });
  });
}

// POST /books
function addBook(book) {
  const sql = "INSERT INTO books (title, author, genre) VALUES (?, ?, ?)";

  return new Promise((resolve, reject) => {
    db.run(sql, [book.title, book.author, book.genre], (err) => {
      if (err) {
        console.error(err.message);
        res.status(400);
        reject(err);
      }
      res.status(201);
      resolve();
    });
  });
}

// PATCH /books/:id
function patchBook(id, book) {
  const sql = `UPDATE books SET title = '${book}' WHERE id = ${id}`;
  return new Promise((resolve, reject) => {
    db.run(sql, [book.title], (err) => {
      if (err) {
        console.error(err.message);
        res.status(400);
        reject(err);
      }
      res.status(200);
      resolve();
    });
  });
}

// PUT /books/:id
function putBook(id, book) {
  const sql = `UPDATE books SET title = '${book.title}', author = '${book.author}', genre = '${book.genre}' WHERE id = ${id}`;

  return new Promise((resolve, reject) => {
    db.run(sql, (err) => {
      if (err) {
        console.error(err.message);
        res.status(400);
        reject(err);
      }
      res.status(200);
      resolve();
    });
  });
}

// DELETE /books/:id
function deleteBook(id) {
  const sql = "DELETE FROM books WHERE id = ?";
  return new Promise((resolve, reject) => {
    db.get(sql, id, (error) => {
      if (error) {
        console.error(error.message);
        res.status(400);
        reject(error);
      }
      res.status(204);
      resolve();
    });
  });
}

module.exports = {
  getAllBooks,
  getBook,
  addBook,
  deleteBook,
  patchBook,
  putBook,
};
