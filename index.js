const express = require("express");
const app = express();
const passport = require("passport");
const db = require("./db");
const path = require("path");
require("dotenv").config();
const port = process.env.PORT;
const httpResponse = require("express-http-response");
const cors = require("cors");
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ limit: "200mb" }));
app.use(cors());
app.use(require("morgan")("dev"));

app.use("/helloworld", (req, res, next) => {
  res.send("Hello World");
});
app.listen(port, () => {
  console.log(`${process.env.SERVER_STARTED_TEXT} ${port}`);
});

app.use(passport.initialize());
app.use(express.static(path.join(__dirname, "/public")));

app.use("/api/users", require("./controllers/user/userController"));
app.use("/api/cases", require("./controllers/cases/casesController"));
app.use("/api/services", require("./controllers/service/servicesController"));
app.use("/api/blogs", require("./controllers/blogs/blogsController"));
app.use(
  "/api/notifications",
  require("./controllers/notifications/notificationsController"),
);
app.use("/api/counts", require("./controllers/counts/countsController"));
app.use("/api/statutes", require("./controllers/statutes/statutesController"));
app.use(
  "/api/dictionary",
  require("./controllers/dictionary/dictionaryController"),
);
app.use(
  "/api/ordinance",
  require("./controllers/ordinance/ordinanceController"),
);
app.use("/api/team", require("./controllers/team/teamController"));

app.use(httpResponse.Middleware);
