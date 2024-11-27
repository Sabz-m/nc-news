const { fetchArticle, fetchArticles } = require("../models/articles.model");

exports.getArticles = (req, res, next) => {
  return fetchArticles().then((rows) => {
    res.status(200).send({ articles: rows });
  });
};

exports.getArticle = (req, res, next) => {
  const { article_id } = req.params;
  return fetchArticle(article_id)
    .then((article) => {
      res.status(200).send({ articles: article });
    })
    .catch((err) => {
      next(err);
    });
};