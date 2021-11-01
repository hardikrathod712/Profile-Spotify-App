import Layout from "components/layout";
// import styles from "styles/playlists.module.css"
import styles from "styles/test.module.css"
import Image from "next/image"
import Link from "next/link"
import axios from "axios";
import { access_token } from "components/spotify-api";
import useSWR from "swr";
import Loader from "components/loader";

// const data = [
//     1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0
// ]

const fetcher = async (url) => {
    const data = await axios({
        method: 'GET',
        url: url,
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    }).then(response => response.data);
    console.log(data);
    return data;
}

export default function Playlists() {
    const { data, error } = useSWR("https://api.spotify.com/v1/me/playlists?limit=50", fetcher);

    if (error) return <Layout><div>Failed</div></Layout>
    if (!data) return <Layout><Loader /></Layout>
    return (
        <Layout>
            <div className={styles.container}>
                <div className={styles.header}>
                    <div>
                        Your Playlists
                    </div>
                </div>
                <div className={styles.playlists}>
                    {
                        data.items.map((playlist, i) => {
                            return (
                                // <div className={styles.playlist} key={i}>
                                //     <div className={styles.cover}>
                                //         <img src={playlist.images.length ? playlist.images[0].url: "/record.jpg"} height="190" width="190" />
                                //     </div>
                                //     <div className={styles.playlistMeta}>
                                //         <div className={styles.name}>
                                //             <Link href="/">
                                //                 <a>{playlist.name}</a>
                                //             </Link>
                                //         </div>
                                //         <div className={styles.tracks}>{playlist.tracks.total} Tracks</div>
                                //     </div>
                                // </div>
                                <div className={styles.playlist} key={i}>
                                    <div className={styles.top}>
                                        <div className={styles.cover}>
                                            <img src={playlist.images.length ? playlist.images[0].url : "/record.jpg"} height="190" width="190" alt={playlist.name}/>
                                        </div>
                                    </div>
                                    <div className={styles.playlistMeta}>
                                        <div className={styles.name}>
                                            <Link href="/">
                                                <a title={playlist.name}>{playlist.name}</a>
                                            </Link>
                                        </div>
                                        <div className={styles.tracks}>{playlist.tracks.total} Tracks</div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </Layout>
    )
}