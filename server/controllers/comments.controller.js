const { fetchArticle } = require("../models/articles.model");
const {
  fetchCommentsByArticleId,
  addCommentsByArticleId,
} = require("../models/comments.models");

exports.getCommentsByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  fetchArticle(article_id)
    .then(() => {
      return fetchCommentsByArticleId(article_id);
    })
    .then((comments) => {
      res.status(200).send({ comments });
    })
    .catch((err) => {
      next(err);
    });
};

exports.postCommentsByArticleId = (req, res, next) => {
  const newComment = req.body;
  const { article_id } = req.params;
  addCommentsByArticleId(newComment, article_id)
    .then((insertedComment) => {
      res.status(201).send({ comment: insertedComment });
    })
    .catch((err) => {
      next(err);
    });
};
