import Layout from "components/layout";
import { useEffect, useState } from "react";
import styles from "styles/topartists.module.css"
import Link from "next/link";

import axios from 'axios';
import { access_token } from "components/spotify-api";
import Loader from "components/loader";

function Button(props) {
    return (
        props.isActive ? <button className={styles.alltime2} onClick={props.onClick}>{props.name}</button> : <button className={styles.alltime1} onClick={props.onClick}>{props.name}</button>
    );
}

export default function TopArtist() {
    const [range, setRange] = useState();
    const [artistData, setArtistData] = useState();

    const api = {
        "alltime": "https://api.spotify.com/v1/me/top/artists?limit=50&time_range=long_term",
        "lst6": "https://api.spotify.com/v1/me/top/artists?limit=50&time_range=medium_term",
        "lst4": "https://api.spotify.com/v1/me/top/artists?limit=50&time_range=short_term"
    }

    const fetcher = async (url) => {
        console.log("called fetcher");
        const data = await axios({
            method: 'GET',
            url: url,
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        }).then(response => response.data);
        setArtistData(data.items);
    }

    const setActiveRange = (range) => {
        const { data, error } = fetcher(api[range]);
        setRange(range);
    }

    useEffect(() => {
        setActiveRange("alltime");
    }, []);

    if (!artistData) return (
        <Layout>
            <Loader />
        </Layout>
    )
    console.log(artistData);
    return (
        <>
            <Layout>
                <div className={styles.artistContainer}>
                    <div className={styles.header}>
                        <div>
                            Top Artists
                        </div>
                        <div className={styles.range}>
                            <Button isActive={range === "alltime"} onClick={() => setActiveRange("alltime")} name="All Time" />
                            <Button isActive={range === "lst6"} onClick={() => setActiveRange("lst6")} name="Last 6 Months" />
                            <Button isActive={range === "lst4"} onClick={() => setActiveRange("lst4")} name="Last 4 Weeks" />
                        </div>
                    </div>
                    <div className={styles.artists}>
                        {
                            artistData.map((artist, i) => {
                                return (
                                    <Link href={artist.external_urls.spotify} key={i}>
                                        <a key={i}><div className={styles.artist} >
                                            <div className={styles.innerartist}>
                                                <div className={styles.artistprof}>
                                                    {/* <Link href="/">
                                                    <Image src={artist.images[1].url} width="200px" height="200px"/>
                                                </Link> */}
                                                    <img src={artist.images[1].url} alt={artist.name} />
                                                </div>
                                                <div className={styles.artistName}>
                                                    {artist.name}
                                                </div>
                                            </div>
                                        </div></a>
                                    </Link>
                                )
                            })
                        }
                    </div>
                </div>
            </Layout>
        </>
    )
}