import NavBar from "./navbar";
import styles from "styles/layout.module.css"

export default function Layout({ children }) {
    return (
        <>
            <NavBar />
            <main className={styles.main}>{children}</main>
        </>
    )
}