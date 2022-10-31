const express = require("express");

const { open } = require("sqlite");
const sqlite3 = require("sqlite3");

const app = express();

const path = require("path");
const dbPath = path.join(__dirname, "goodreads.db");
console.log(dbPath);

let db = null;

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Server Started Running at http:localhost:3000/books");
    });
  } catch (e) {
    console.log(`Db Error ${e.message}`);
    process.exit(1);
  }
};

initializeDBAndServer();

app.get("/books/", async (request, response) => {
  const getBooksQuery = `SELECT * FROM book ORDER BY book_id`;

  const booksArray = await db.all(getBooksQuery);
  response.send(booksArray);
});
