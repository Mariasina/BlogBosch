const mongoose = require("mongoose");
const { authorSchema } = require("./author");

const Article = mongoose.model(
    "Article",
    new mongoose.Schema({
        title: {
            type: String,
            required: true,
            minlength: 3,
        },
        text: {
            type: String,
            required: true,
            minlength: 15,
        },
        author: {
            type: authorSchema,
            required: true,
        },
        likes: {
            type: [String],
            required: true,
        },
        createdAt: {
            type: Date,
            required: true,
        },
        updatedAt: {
            type: Date,
            required: false,
        },
        removedAt: {
            type: Date,
            required: false,
        },
    })
);

module.exports = Article;
