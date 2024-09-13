import FormComponent from "../../components/FormComponent";
import Menu from "../../components/Menu";
import styles from "./styles.module.scss";

export default function AddPostPage() {
    return (
        <>
            <div className={styles.mainContainer}>
                <Menu />
                <div className={styles.formContainer}>
                    <FormComponent />
                </div>
            </div>
        </>
    );
}
