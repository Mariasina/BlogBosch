import { useContext, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";
import { AlertContext } from "../../context/alert";
import CryptoJS from 'crypto-js';
import axios from "axios";

export default function CardLogin() {
    const { setMessage, setShow, setVariant } = useContext(AlertContext);
    const navigate = useNavigate();
    var [email, setEmail] = useState("");
    var [pass, setPass] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        if (!formValid()) return;
        const json = {
            email,
            pass,
        };
        const {REACT_APP_SECRET} = process.env

        try {
            const jsonCrypt = CryptoJS.AES.encrypt(
                JSON.stringify(json),
                REACT_APP_SECRET
            ).toString();
            var res = await axios.post("http://localhost:8080/api/user/login", {
                jsonCrypt,
            });
            sessionStorage.setItem("token", res.data.token);
            navigate("/home");
        } catch (error) {
            setMessage("Erro ao se conectar");
            console.log(error);
            setShow(true);
            setVariant("danger");
        }
    }

    function formValid() {
        if (!email.includes("@")) {
            setMessage("Insira um e-mail válidos");
            setShow(true);
            setVariant("danger");
            return false;
        }
        if (email.length < 5) {
            setMessage("Insira um e-mail válido");
            setShow(true);
            setVariant("danger");
            return false;
        }
        return true;
    }

    return (
        <Card className={styles.card}>
            <Card.Header className={styles.card__header}>
                <Card.Title>Login</Card.Title>
            </Card.Header>
            <Card.Body className={styles.card__body}>
                <Form className={styles.card__form} onSubmit={handleSubmit}>
                    <Form.Control
                        value={email}
                        placeholder="Insira seu e-mail"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Form.Control
                        type="password"
                        value={pass}
                        placeholder="Insira sua senha"
                        onChange={(e) => setPass(e.target.value)}
                    />
                    <Button className={styles.card__form__button} type="submit">
                        Entrar
                    </Button>
                    <Link className={styles.card__link} to={"/register"}>
                        Crie sua conta
                    </Link>
                </Form>
            </Card.Body>
        </Card>
    );
}
