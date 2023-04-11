const express = require("express");
const app = express();
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");
let db = null;
const dbpath = path.join(__dirname, "goodreads.db");
const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbpath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Server running https:localhost:3000");
    });
  } catch (e) {
    console.log(`DB Error ${e.message}`);
    process.exit(1);
  }
};
initializeDBAndServer();
app.get("/books/", async (request, response) => {
  const getbooksquery = `
        SELECT *
        FROM book
        ORDER BY book_id
    `;
  const booksArray = await db.all(getbooksquery);
  response.send(booksArray);
});

module.exports = app;
