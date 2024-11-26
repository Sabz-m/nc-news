const endpointsJson = require("../../endpoints.json");
const { fetchTopics } = require("../models/app.model");

exports.getApi = (req, res) => {
  res.status(200).send({ endpoints: endpointsJson });
};

exports.getApiTopics = (req, res) => {
  return fetchTopics().then((rows) => {
    res.status(200).send(rows);
  });
};
