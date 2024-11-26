const express = require("express");
const { getApi, getApiTopics } = require("./controllers/app.controller");
const app = express();

app.get("/api", getApi);

app.get("/api/topics", getApiTopics);

module.exports = app;
