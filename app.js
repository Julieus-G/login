//jshint esversion:6
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const port = 3000 || proces.env.PORT;
const saltRounds = 10;

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

// connecting to mongodb
mongoose.connect("mongodb://localhost:27017/userDB", { useNewUrlParser: true });

// setting up the Schema
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

// setting up the model
const User = new mongoose.model("User", userSchema);

app.get("/", (req, res) => {
  res.render("home");
});
app.get("/login", (req, res) => {
  res.render("login");
});
app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", (req, res) => {
  bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    const newUser = new User({
      email: req.body.username,
      password: hash,
    });

    newUser.save((err) => {
      if (err) {
        console.log(err);
      } else {
        res.render("favs");
      }
    });
  });
  });

  

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({ email: username }, (err, founduser) => {
    if (err) {
      console.log(err);
    } else {
      if (founduser) {
        bcrypt.compare(password, founduser.password, (err, result) => {
          if (result == true) {
            res.render("favs");
          } else {
          }
        });
      }
    }
  });
});

app.listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
});
