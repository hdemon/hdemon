"use strict";

var express = require("express");
var MyArticle = require("./my_article");
var app = express();

app.set("port", process.env.PORT || 5000);
app.use(express["static"](__dirname + "/public"));

var myArticle = new MyArticle();

app.get("/", function (request, response) {
  response.send("Hello World!");
});

app.get("/articles", function (request, response) {
  myArticle.fetchIndex().then(function (data) {
    response.send(data);
  });
});

app.listen(app.get("port"), function () {
  console.log("Node app is running at localhost:" + app.get("port"));
});