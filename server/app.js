const express = require("express");
const { getApi } = require("./controllers/app.controller");
const { getTopics } = require("./controllers/topics.controller");
const {
  getArticles,
  getArticle,
  patchArticleByArticleId,
} = require("./controllers/articles.controller");
const {
  getCommentsByArticleId,
  postCommentsByArticleId,
  deleteCommentBycommentId,
} = require("./controllers/comments.controller");
const {
  postgresErrorHandler,
  customErrorHandler,
  serverErrorHandler,
} = require("./error-handler");
const app = express();

app.use(express.json());

app.get("/api", getApi);

app.get("/api/topics", getTopics);

app.get("/api/articles", getArticles);

app.get("/api/articles/:article_id", getArticle);

app.get("/api/articles/:article_id/comments", getCommentsByArticleId);

app.post("/api/articles/:article_id/comments", postCommentsByArticleId);

app.patch("/api/articles/:article_id", patchArticleByArticleId);

app.delete("/api/comments/:comment_id", deleteCommentBycommentId);

app.all("*", (res, req) => {
  res.status(404).send({ msg: "Not Found" });
});

app.use(postgresErrorHandler);

app.use(customErrorHandler);

app.use(serverErrorHandler);

module.exports = app;
