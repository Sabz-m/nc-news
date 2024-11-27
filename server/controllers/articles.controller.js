const {
  fetchArticle,
  fetchArticles,
  updateArticlebyArticleId,
} = require("../models/articles.model");

exports.getArticles = (req, res, next) => {
  fetchArticles().then((rows) => {
    res.status(200).send({ articles: rows });
  });
};

exports.getArticle = (req, res, next) => {
  const { article_id } = req.params;
  fetchArticle(article_id)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch((err) => {
      next(err);
    });
};

exports.patchArticlebyArticleId = (req, res, next) => {
  const { inc_votes } = req.body;
  const { article_id } = req.params;

  fetchArticle(article_id)
    .then(() => {
      return updateArticlebyArticleId(article_id, inc_votes);
    })
    .then((updatedArticle) => {
      res.status(200).send(updatedArticle);
    })
    .catch((err) => {
      next(err);
    });
};
