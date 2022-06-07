const db = require("../database");

// GET /books
function getAllBooks() {
  const sql = "SELECT * FROM books";

  return new Promise((resolve, reject) => {
    db.all(sql, (error, rows) => {
      if (error) {
        console.error(error.message);
        reject(error);
      }
      resolve(rows);
      console.log(rows)
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
        reject(error);
      }
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
        reject(err);
      }
      resolve();
    });
  });
}

module.exports = {
  getAllBooks,
  getBook,
  addBook,
};
