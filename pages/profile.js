import Layout from "components/layout";
import styles from "styles/profile.module.css"
import Link from "next/link"
import Image from "next/image"
import { access_token, logout } from 'components/spotify-api';
import React from "react";

// Spotify Api
import useSWR from "swr";
import axios from "axios";
import Loader from "components/loader";
import TopArtistAllTime from "components/topartisttime";
import TopTrackAllTime from "components/toptracktime";

const fetcher = async url => {
    const data = await axios({
        method: 'GET',
        url: url,
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    }).then(response => response.data);
    const data2 = await axios({
        method: 'GET',
        url: "https://api.spotify.com/v1/me/following?type=artist&limit=1",
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    }).then(response => response.data);
    const data3 = await axios({
        method: 'GET',
        url: "https://api.spotify.com/v1/me/playlists?limit=1",
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    }).then(response => response.data);
    data.following = data2.artists.total;
    data.playlist = data3.total;
    return data;
}

const Logout = React.forwardRef(({ onClick, href }, ref) => {
    return (
        <a href={href} onClick={logout} ref={ref} className={styles.logout}>
            Logout
        </a>
    )
})
Logout.displayName = "Logout";

export default function Profile() {
    const { data, error } = useSWR('https://api.spotify.com/v1/me', fetcher)
    if (error) return <div>Failed to Load</div>
    if (!data)
        return (
            <>
                <Layout>
                    <Loader />
                </Layout>
            </>
        )
    return (
        <>
            <Layout>
                <div className={styles.profileContainer}>
                    <div className={styles.picture}>
                        <Image src={data.images[0].url} layout="fill" alt={data.display_name}/>
                    </div>
                    <div className={styles.adjust}>
                        <div className={styles.temp}>
                            Profile
                        </div>
                        <div className={styles.username}>
                            <Link href={data.external_urls.spotify}><a target="_blank" rel="noopener noreferrer">{data.display_name}</a></Link>
                        </div>
                        <div className={styles.stats}>
                            <div className={styles.indStats}>
                                <div>{data.followers.total}</div>
                                <div className={styles.head}>Followers</div>
                            </div>
                            <div className={styles.indStats}>
                                <div>{data.following}</div>
                                <div className={styles.head}>Following</div>
                            </div>
                            <div className={styles.indStats}>
                                <div>{data.playlist}</div>
                                <div className={styles.head}>Playlists</div>
                            </div>
                        </div>
                    </div>
                    <Link href="/" passHref>
                        <Logout />
                    </Link>
                </div>
                <section className={styles.preview}>
                    <TopArtistAllTime/>
                    <TopTrackAllTime/>
                </section>
            </Layout>
        </>
    )
}

// export async function getServerSideProps(context) {
//     console.log("Entered!!");
//     const data = getUser();
//     return {
//         props: {
//             userData: data,
//         }
//     }
// }