const User = require("../model/user");
const jwt = require("jsonwebtoken");
const { Author } = require("../model/author");
require("dotenv").config();
const CryptoJS = require("crypto-js");

class AuthControler {
    static async register(req, res) {
        const { name, birth, email, password, confirmPassword } = req.body;
        if (!name)
            return res.status(400).json({ message: "O nome é obrigatório" });
        if (!email)
            return res.status(400).json({ message: "O e-mail é obrigatório" });
        if (!password)
            return res.status(400).json({ message: "A senha é obrigatória" });
        if (password != confirmPassword)
            return res.status(400).json({ message: "As senhas não conferem" });
        const userExist = await User.findOne({ email: email });
        if (userExist)
            return res.status(409).json({ message: "insira outro e-mail" });
        const passwordCrypt = CryptoJS.AES.encrypt(
            password,
            process.env.SECRET
        ).toString();
        const author = new Author({
            name,
            email,
            birth,
            createdAt: Date.now(),
            updatedAt: Date.now(),
            removedAt: null,
        });
        const user = new User({
            login: email,
            author,
            email,
            password: passwordCrypt,
            createdAt: Date.now(),
            updatedAt: Date.now(),
            removedAt: null,
        });
        try {
            await User.create(user);
            res.status(201).send({ message: "Usuário cadastrado com sucesso" });
        } catch (error) {
            return res
                .status(500)
                .send({ message: "Something failed", data: error.message });
        }
    }

    static async login(req, res) {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        const secret = process.env.SECRET;

        if (!user)
            return res
                .status(400)
                .send({ message: "Invalid Email or password" });
        if (
            (await CryptoJS.AES.decrypt(user.password, secret).toString(
                CryptoJS.enc.Utf8
            )) != password
        ) {
            return res
                .status(400)
                .send({ message: "Invalid Email or password" });
        }
        const token = jwt.sign(
            {
                id: user._id,
            },
            secret,
            {
                expiresIn: "2 days",
            }
        );
        return res.status(200).send({ token: token });
    }

    static async verifyJWT(req, res, next) {
        const token = req.headers["authorization"];
        if (!token)
            return res
                .status(401)
                .json({ auth: false, message: "No token provided." });

        jwt.verify(token, process.env.SECRET, function (err, decoded) {
            if (err)
                return res
                    .status(500)
                    .json({
                        auth: false,
                        message: "Failed to authenticate token.",
                    });

            req.userId = decoded.id;
            next();
        });
    }
}
module.exports = AuthControler;
