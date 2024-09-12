import { useContext, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";
import { AlertContext } from "../../context/alert";

export default function CardLogin() {
    const { setMessage, setShow, setVariant } = useContext(AlertContext);
    const navigate = useNavigate();
    var [email, setEmail] = useState("");
    var [pass, setPass] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        if (!formValid()) return;
        navigate("/home");
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
                        value={pass}
                        placeholder="Insira sua senha"
                        onChange={(e) => setPass(e.target.value)}
                    />
                    <Button className={styles.card__form__button} type="submit">
                        Entrar
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
}
