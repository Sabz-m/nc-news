const db = require("../../db/connection");

exports.checkIfCommentsExists = (comment_id) => {
  return db
    .query(`SELECT * FROM comments WHERE comment_id = $1;`, [comment_id])
    .then((result) => {
      if (result.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Not Found" });
      } else {
        return result.rows[0];
      }
    });
};

exports.fetchCommentsByArticleId = (article_id) => {
  return db
    .query(
      `SELECT * FROM comments WHERE article_id = $1
      ORDER BY created_at DESC;`,
      [article_id]
    )
    .then(({ rows: comments }) => {
      return comments;
    });
};

exports.addCommentsByArticleId = (newComment, article_id) => {
  const { username, body } = newComment;
  return db
    .query(
      `INSERT INTO comments (author,body, article_id) VALUES ($1,$2,$3) RETURNING * ;`,
      [username, body, article_id]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};

exports.removeCommentBycommentId = (comment_id) => {
  return db
    .query(
      `DELETE FROM comments
      WHERE comment_id = $1
      RETURNING * ;`,
      [comment_id]
    )
    .then(({ rows: [comment] }) => {
      return comment;
    });
};
