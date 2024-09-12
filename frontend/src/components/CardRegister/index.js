import { useContext, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import axios from "axios";
import styles from "./styles.module.scss";
import { AlertContext } from "../../context/alert";

export default function CardRegister() {
    const { setMessage, setShow, setVariant } = useContext(AlertContext);
    var [name, setName] = useState("");
    var [email, setEmail] = useState("");
    var [birth, setBirth] = useState(Date());
    var [password, setPassword] = useState("");
    var [confirmPass, setConfirmPass] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        if (!formValid()) return;
    }

    function formValid() {
        if (!name.includes(" ")) {
            setMessage("Insira nome e sobrenome");
            setShow(true);
            setVariant("danger");
            return false;
        }
        if (name.length < 5) {
            setMessage("Insira um nome e sobrenome válidos");
            setShow(true);
            setVariant("danger");
            return false;
        }
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
        if (confirmPass !== password) {
            setMessage("As senhas não conferem");
            setShow(true);
            setVariant("danger");
            return false;
        }
        if (password.length < 6) {
            setMessage("Senha inferior a 6 caracteres");
            setShow(true);
            setVariant("danger");
            return false;
        }
        return true;
    }

    return (
        <Card className={styles.card}>
            <Card.Header className={styles.card__header}>
                <Card.Title>Registrar-se</Card.Title>
            </Card.Header>
            <Card.Body className={styles.card__body}>
                <Form className={styles.card__form} onSubmit={handleSubmit}>
                    <div>
                        <Form.Label>Insira seu nome</Form.Label>
                        <Form.Control
                            placeholder="Nome Completo"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div>
                        <Form.Label>Insira seu e-mail</Form.Label>
                        <Form.Control
                            placeholder="E-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <Form.Label>Insira sua data de nascimento</Form.Label>
                        <Form.Control
                            type="date"
                            value={birth}
                            onChange={(e) => setBirth(e.target.value)}
                        />
                    </div>
                    <div>
                        <Form.Label>Insira sua senha</Form.Label>
                        <Form.Control
                            placeholder="Senha"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <Form.Label>Confirme sua senha</Form.Label>
                        <Form.Control
                            placeholder="Confirmação de Senha"
                            type="password"
                            value={confirmPass}
                            onChange={(e) => setConfirmPass(e.target.value)}
                        />
                    </div>
                    <Button className={styles.card__form__button} type="submit">
                        Entrar
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
}
