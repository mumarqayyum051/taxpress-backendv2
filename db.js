// const mysql = require("mysql");
// require("dotenv").config();

// const db = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
// });

// db.connect((err) => {
//   if (!err) {
//     console.log("DB Connected");
//   } else {
//     console.log("DB not connected", JSON.stringify(err));
//   }
// });
// module.exports = db;

const mysql = require("mysql");
const mysqlssh = require("mysql-ssh2");
const fs = require("fs");
require("dotenv").config();
const connection = mysqlssh.connect(
  {
    host: "premium96.web-hosting.com",
    port: 21098,
    user: "kingcobblertest",
    privateKey: fs.readFileSync("./kingcobbler"),
    passphrase: "Joker@170",
  },
  {
    host: "127.0.0.1",
    port: 3306,
    user: "kingcobblertest_taxpress",
    password: "taxpress@170",
    database: "kingcobblertest_taxpress",
  },
);

// const db = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
// });

// db.connect((err) => {
//   if (!err) {
//     console.log('DB Connected');
//   } else {
//     console.log('DB not connected', JSON.stringify(err));
//   }
// });
const db = connection
  .then((conn) => {
    console.log("DB Connected");
    return conn;
  })
  .catch((err) => {
    console.log("DB not connected", JSON.stringify(err));
  });
module.exports = db;
