const express = require("express");
const article = require("../src/routes/article");
const author = require("../src/routes/author");
const user = require("../src/routes/user");
const UserController = require("../src/controller/UserController");

module.exports = function (app) {
    app.use(express.json())
        .use("/api/article", UserController.verifyJWT, article)
        .use("/api/author", UserController.verifyJWT, author)
        .use("/api/user", user);
};
