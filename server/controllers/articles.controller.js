const {
  fetchArticle,
  fetchArticles,
  updateArticleByArticleId,
} = require("../models/articles.model");

exports.getArticles = (req, res, next) => {
  const { sortBy, order, topic } = req.query;
  fetchArticles(sortBy, order, topic).then((rows) => {
    res.status(200).send({ articles: rows });
  });
};

exports.getArticle = (req, res, next) => {
  const { article_id } = req.params;
  const { comment_count } = req.query;

  fetchArticle(article_id, comment_count)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch((err) => {
      next(err);
    });
};

exports.patchArticleByArticleId = (req, res, next) => {
  const { inc_votes } = req.body;
  const { article_id } = req.params;

  fetchArticle(article_id)
    .then(() => {
      return updateArticleByArticleId(article_id, inc_votes);
    })
    .then((updatedArticle) => {
      res.status(200).send(updatedArticle);
    })
    .catch((err) => {
      next(err);
    });
};
