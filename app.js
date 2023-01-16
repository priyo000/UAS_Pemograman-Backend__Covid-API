// import express dan router
const express = require("express");
const router = require("./routes/api.js");
const bodyParser = require("body-parser");

// import dotenv dan menjalankan method config
require("dotenv").config();

// destructing object process.env
const { APP_PORT } = process.env;

// membuat object express
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// menggunakan middleware
app.use(express.json());

// menggunakan routing (router)
app.use(router);

app.use(express.urlencoded({ extended: true }));

app.use(async function (req, res, next) {
  // set control allowed headers
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'OPTIONS,GET,HEAD,PUT,PATCH,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, Range, X-Requested-With, x-forwarded-for');
  next();
})

// mendefinisikan port
app.listen(APP_PORT, () =>
  console.log(`Server running at: http://localhost:${APP_PORT}`)
);
