const express = require("express");
const { getApi } = require("./controllers/app.controller");
const { getTopics } = require("./controllers/topics.controller");
const {
  getArticles,
  getArticle,
} = require("./controllers/articles.controller");
const app = express();

app.get("/api", getApi);

app.get("/api/topics", getTopics);

app.get("/api/articles/:article_id", getArticle);

module.exports = app;
