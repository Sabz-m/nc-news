const db = require("../../db/connection");

exports.fetchArticles = (sortBy = `created_at`, order = `DESC`, topic) => {
  const topicSQLParams = [];
  let sqlQuery = `SELECT articles.article_id, articles.title, articles.topic, articles.author, articles.created_at, articles.votes, articles.article_img_url, COUNT(comments.article_id) AS comment_count FROM articles LEFT OUTER JOIN comments ON articles.article_id = comments.article_id `;

  if (topic) {
    sqlQuery += `WHERE articles.topic = $1 `;
    topicSQLParams.push(topic);
  }
  sqlQuery += `GROUP BY articles.article_id `;

  sqlQuery += `ORDER BY ${sortBy} ${order};`;

  return db.query(sqlQuery, topicSQLParams).then(({ rows }) => {
    return rows;
  });
};

exports.fetchArticle = (article_id, comment_count) => {
  return db
    .query(
      `SELECT articles.article_id, articles.title, articles.topic, articles.author, articles.created_at, articles.votes, articles.article_img_url, articles.body, COUNT(comments.article_id) AS comment_count FROM articles LEFT OUTER JOIN comments ON articles.article_id = comments.article_id WHERE articles.article_id = $1 GROUP BY articles.article_id;`,
      [article_id]
    )
    .then((result) => {
      if (result.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Not Found" });
      } else {
        return result.rows[0];
      }
    });
};

exports.updateArticleByArticleId = (article_id, inc_votes) => {
  return db
    .query(
      `UPDATE articles
      SET votes = votes + $1
      WHERE article_id = $2
      RETURNING *;`,
      [inc_votes, article_id]
    )
    .then(({ rows: [article] }) => {
      return article;
    });
};
