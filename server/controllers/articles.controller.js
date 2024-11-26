const { fetchArticle } = require("../models/articles.model");

exports.getArticle = (req, res) => {
  const { article_id } = req.params;
  return fetchArticle(article_id)
    .then((article) => {
      res.status(200).send({ articles: article });
    })
    .catch((err) => {
      if (err.code === "22P02") {
        return res.status(400).send({ msg: "Bad request" });
      }
      res.status(404).send({ msg: "article does not exist" });
    });
};
