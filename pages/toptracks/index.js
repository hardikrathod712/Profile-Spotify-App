import Layout from "components/layout";
import { useEffect, useState } from "react";
import styles from "styles/topartists.module.css"
import Link from "next/link";

import axios from 'axios';
import { access_token } from "components/spotify-api";
import Loader from "components/loader";
import Track from "components/track";

function Button(props) {
    return (
        props.isActive ? <button className={styles.alltime2} onClick={props.onClick}>{props.name}</button> : <button className={styles.alltime1} onClick={props.onClick}>{props.name}</button>
    );
}

export default function TopArtist() {
    const [range, setRange] = useState();
    const [trackData, setTrackData] = useState();

    const api = {
        "alltime": "https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=long_term",
        "lst6": "https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=medium_term",
        "lst4": "https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=short_term"
    }

    const fetcher = async (url) => {
        const data = await axios({
            method: 'GET',
            url: url,
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        }).then(response => response.data);
        setTrackData(data.items);
    }

    const setActiveRange = (range) => {
        const { data, error } = fetcher(api[range]);
        setRange(range);
    }

    useEffect(() => {
        setActiveRange("alltime");
    }, []);

    if (!trackData) return (
        <Layout>
            <Loader />
        </Layout>
    )
    console.log(trackData);
    return (
        <>
            <Layout>
                <div className={styles.artistContainer}>
                    <div className={styles.header}>
                        <div>
                            Top Tracks
                        </div>
                        <div className={styles.range}>
                            <Button isActive={range === "alltime"} onClick={() => setActiveRange("alltime")} name="All Time" />
                            <Button isActive={range === "lst6"} onClick={() => setActiveRange("lst6")} name="Last 6 Months" />
                            <Button isActive={range === "lst4"} onClick={() => setActiveRange("lst4")} name="Last 4 Weeks" />
                        </div>
                    </div>
                    <div className={styles.tracks}>
                        <ul>
                            {
                                trackData.map((track, i) => {
                                    return (
                                        <Track track={track} key={i} />
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
            </Layout>
        </>
    )
}