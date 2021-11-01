import styles from "styles/loader.module.css"

export default function Loader() {
    return (
        <div className={styles.container}>
            <div className={styles.bars}>
                <div className={styles.bar1}></div>
                <div className={styles.bar2}></div>
                <div className={styles.bar3}></div>
                <div className={styles.bar4}></div>
                <div className={styles.bar5}></div>
            </div>
        </div>
    )
}