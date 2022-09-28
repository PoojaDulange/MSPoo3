var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var usersRouter = require("./api/users/users.router");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/users", usersRouter);
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.listen(process.env.APP_PORT, () => {
  console.log(`server running on port ${process.env.APP_PORT}`);
});

module.exports = app;
