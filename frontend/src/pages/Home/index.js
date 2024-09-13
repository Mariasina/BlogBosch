import { Container } from "react-bootstrap";
import Menu from "../../components/Menu";
import Post from "../../components/Post";
import styles from "./styles.module.scss";

export default function HomePage() {
    return (
        <>
            <Menu />
            <Container className={styles.postContainer}>
                <Post />
            </Container>
        </>
    );
}
