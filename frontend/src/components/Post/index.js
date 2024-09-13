import { useEffect, useState } from "react";
import { Button, Card, Container } from "react-bootstrap";
import styles from "./styles.module.scss";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import axios from "axios";

export default function Post() {
    var [artigos, setArtigos] = useState([]);

    async function getPosts() {
        const res = await axios.get("http://localhost:8080/api/article");
        setArtigos(res.data);
    }

    async function handleClick(id) {
        await axios.post(`http://localhost:8080/api/article/like/${id}`);
        getPosts();
    }

    useEffect(() => {
        getPosts();
    }, []);

    const RenderPosts = () => {
        return artigos.map((artigo) => {
            return (
                <Card key={artigo.id} className={styles.card}>
                    <Card.Title className={styles.card__title}>
                        {artigo.title}
                    </Card.Title>
                    <Card.Body className={styles.card__body}>
                        <Card.Text className={styles.card__body__article}>
                            {artigo.text}
                        </Card.Text>
                        <div className="d-flex align-items-center ">
                            <div className={styles.card__likeInfo}>
                                {artigo.likes}
                                <FcLikePlaceholder
                                    onClick={() => handleClick(artigo._id)}
                                    className={styles.card__like}
                                />
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            );
        });
    };

    return <RenderPosts />;
}
