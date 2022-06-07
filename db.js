const mysql = require("mysql");
require("dotenv").config();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.DB_PASSWORD,
  database: "texpress",
});

db.connect((err) => {
  if (!err) {
    console.log("DB Connected");
  } else {
    console.log("DB not connected", JSON.stringify(err));
  }
});
module.exports = db;
