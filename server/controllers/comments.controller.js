const { fetchArticle } = require("../models/articles.model");
const {
  fetchCommentsByArticleId,
  addCommentsByArticleId,
  removeCommentBycommentId,
  checkIfCommentsExists,
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

exports.deleteCommentBycommentId = (req, res, next) => {
  const { comment_id } = req.params;
  const promises = [
    checkIfCommentsExists(comment_id),
    removeCommentBycommentId(comment_id),
  ];

  Promise.all(promises)
    .then((comment) => {
      res.status(204).send(comment);
    })
    .catch((err) => {
      next(err);
    });
};
