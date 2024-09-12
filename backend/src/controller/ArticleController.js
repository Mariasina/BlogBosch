const path = require("path");
const fs = require("fs");
const authorController = require("./AuthorController");
const userController = require("./UserController");
const Article = require("../model/article");

class ArticleController {
    static createLog(error) {
        const timestamp = Date.now();
        const archivePath = path.resolve(
            __dirname,
            "../logs",
            `logs-${timestamp}.txt`
        );
        const errorString = JSON.stringify(error.message);
        fs.writeFile(archivePath, errorString, function (err, result) {
            if (err) console.log(err);
        });
    }

    static async create(req, res) {
        const { title, text, authorid } = req.body;
        if (!title || !text || !authorid)
            return res
                .status(400)
                .send({ message: "os campos não podem estar vazios " });
        if (title.length < 1)
            return res.status(400).send({
                message: "o titulo não pode ser menor 1 que caracter",
            });
        if (text.length < 1)
            return res.status(400).send({
                message: "a descrição não pode ser menor que 1 caracter",
            });
        try {
            const author = await authorController.getAuthor(authorid);
            const article = {
                title,
                text,
                likes: [],
                author,
                createdAt: Date.now(),
                updatedAt: Date.now(),
                removedAt: null,
            };
            await Article.create(article);
            return res
                .status(201)
                .send({ message: "Artigo criado com sucesso" });
        } catch (error) {
            ArticleController.createLog(error);
            return res.status(500).send({
                error: "Falha ao salvar o artigo",
                data: error.message,
            });
        }
    }

    static async likeArticle(req, res) {
        const { id } = req.params;
        const userId = req.userId;
    
        if (!id) return res.status(400).send({ message: "No id provided" });
        if (!userId) return res.status(400).send({ message: "No userId provided" });
    
        try {
            const article = await Article.findById(id);
    
            if (!article) {
                return res.status(404).send({ message: "Article not found" });
            }
    
            const hasLiked = article.likes.includes(userId);
    
            if (hasLiked) {
                await Article.findByIdAndUpdate(
                    id,
                    { $pull: { likes: userId } }
                );
            } else {
                await Article.findByIdAndUpdate(
                    id,
                    { $push: { likes: userId } }
                );
            }
    
            return res.status(200).send({ message: hasLiked ? "Disliked" : "Liked" });
        } catch (error) {
            ArticleController.createLog(error);
            return res
                .status(500)
                .send({ error: "Failed to like or dislike", data: error.message });
        }
    }
    
}

module.exports = ArticleController;
