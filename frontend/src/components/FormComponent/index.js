import { useContext, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import styles from "./styles.module.scss";
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import { AlertContext } from "../../context/alert";

export default function FormComponent() {
    const { setMessage, setShow, setVariant } = useContext(AlertContext);
    var [title, setTitle] = useState("");
    var [text, setText] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const token = sessionStorage.getItem("token");
            const decodeToken = jwtDecode(token);
            const { id } = decodeToken;
            const res = await axios.post("http://localhost:8080/api/article", {
                authorid: id,
                title,
                text,
            });
            setMessage(res.data.message);
            setShow(true);
            setVariant("success");
            setTitle("");
            setText("");
        } catch (error) {
            console.log(error);
            setMessage(
                "Erro ao inserir o artigo, reveja as informações e tente novamente"
            );
            setShow(true);
            setVariant("danger");
        }
    }

    return (
        <Container>
            <Row>
                <Col>
                    <Form onSubmit={handleSubmit} className={styles.form}>
                        <Form.Text className={styles.form__title}>
                            Digite Aqui seu Artigo
                        </Form.Text>
                        <Form.Control
                            placeholder="Titulo"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <Form.Control
                            className={styles.form__textArea}
                            as="textarea"
                            placeholder="Texto"
                            rows={5}
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />
                        <Col
                            xs={12}
                            sm={9}
                            md={6}
                            className={styles.form__footer}
                        >
                            <Button
                                type="submit"
                                className={styles.form__footer__button}
                            >
                                Salvar
                            </Button>
                        </Col>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}
