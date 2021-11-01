import Link from "next/link"
import styles from "styles/navbar.module.css"
import SpotifyIcon from "./icons/spotify"
import ProfileIcon from "./icons/profile"
import ArtistIcon from "./icons/artist"
import TrackIcon from "./icons/tracks"
import RecentIcon from "./icons/recent"
import PlaylistIcon from "./icons/playlist"
import { useRouter } from "next/router"

export default function NavBar() {
    const router = useRouter();
    return (
        <>
            <nav>
                <div className={styles.nav}>
                    <div className={styles.logo}>
                        <Link href="/" passHref>
                            <SpotifyIcon />
                        </Link>
                    </div>
                    <ul className={styles.menu}>
                        <li className={router.pathname == "/profile" ? styles.activeMenu : styles.menuLink}>
                            <Link href="/profile" passHref>
                                <a><ProfileIcon />Profile</a>
                            </Link>
                        </li>
                        <li className={/\/artists\/[a-zA-Z0-9]*/.test(router.pathname) ? styles.activeMenu : styles.menuLink}>
                            <Link href="/artists/topartists" passHref>
                                <a> <span><ArtistIcon /></span> Top Artists</a>
                            </Link>
                        </li>
                        <li className={router.pathname == "/toptracks" ? styles.activeMenu : styles.menuLink}>
                            <Link href="/toptracks" passHref>
                                <a> <span><TrackIcon /></span> Top Tracks</a>
                            </Link>
                        </li>
                        <li className={router.pathname == "/recent" ? styles.activeMenu : styles.menuLink}>
                            <Link href="/recent" passHref>
                                <a> <span><RecentIcon /></span> Recent</a>
                            </Link>
                        </li>
                        <li className={/\/playlists\/*[a-zA-Z0-9]*/.test(router.pathname) ? styles.activeMenu : styles.menuLink} >
                            <Link href="/playlists" passHref>
                                <a> <span><PlaylistIcon /></span> Playlists</a>
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}