import styles from 'styles/app.module.css'
import Link from 'next/link'

const LOGIN_URL = process.env.NEXT_PUBLIC_LOGIN_URL

export default function Login() {
    return (
        <>
            <div className={styles.app}>
                <h1 className="mb-6 text-4xl md:text-5xl font-black antialiased ...">Spotify Profile</h1>
                <Link href={LOGIN_URL}>
                    <a className={styles.loginbutton}>LOG IN TO SPOTIFY</a>
                </Link>
                <div className={styles.footer}>
                    <p className="text-white text-opacity-75">DEVELOPED BY {' '}
                        <a href="https://github.com/hardikrathod712" className="text-white text-opacity-100 hover:underline">
                            HARDIK RATHOD
                        </a>
                    </p>
                </div>
            </div>
        </>
    );
}