import { Col, Row } from "react-bootstrap";
import styles from "./styles.module.scss";
import CardRegister from "../../components/CardRegister";
import AlertComponent from "../../components/AlertComponent";

export default function RegisterPage() {
    return (
        <Col className={styles.container}>
            <Row className={styles.container__row}>
                <Col xs={12} sm={8} md={4}>
                    <AlertComponent />
                    <CardRegister />
                </Col>
            </Row>
        </Col>
    );
}
