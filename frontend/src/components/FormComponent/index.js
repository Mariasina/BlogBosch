import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import styles from "./styles.module.scss";

export default function FormComponent() {
    var [author, setAuthor] = useState("");
    var [title, setTitle] = useState("");
    var [text, setText] = useState("");

    return (
        <Container>
            <Row>
                <Col>
                    <Form onSubmit={"o"} className={styles.form}>
                        <Form.Text className={styles.form__title}>
                            Digite Aqui seu Artigo
                        </Form.Text>
                        <Form.Control
                            placeholder="Autor"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                        />
                        <Form.Control
                            placeholder="Titulo"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <Form.Control
                            as="textarea"
                            placeholder="Texto"
                            rows={5}
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />
                        <Col xs={12} sm={9} md={6} className={styles.form__div}>
                            <Button
                                type="submit"
                                className={styles.form__div__button}
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
