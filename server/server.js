var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");

var index = require("./routes/index");
var booking = require("./routes/booking");
var mongoose = require("mongoose");

var app = express();

mongoose.Promise = global.Promise;

//views
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);

//body parser mw

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//routes

app.use("/", index);
app.use("/api", booking);

mongoose
  .connect(
    `mongodb+srv://benachir:anahowa12@cluster0-ijowc.mongodb.net/test?retryWrites=true&w=majority`,
    { useNewUrlParser: true })
    .then(() => {
      console.log("connected");
      app.listen(3000);
    })
    .catch(err => {
      console.log(err);
    });
