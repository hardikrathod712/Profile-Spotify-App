import Layout from "components/layout";
import { useEffect, useState } from "react";
import styles from "styles/topartists.module.css"
import Link from "next/link";

import axios from 'axios';
import { access_token } from "components/spotify-api";
import Loader from "components/loader";
import Track from "components/track";
import useSWR from "swr";

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

export default function RecentTracks() {
    const { data, error } = useSWR("https://api.spotify.com/v1/me/player/recently-played",fetcher);

    if(error) return (
        <div>Failed to Load</div>
    );
    
    if (!data) return (
        <Layout>
            <Loader />
        </Layout>
    )
    return (
        <>
            <Layout>
                <div className={styles.artistContainer}>
                    <div className={styles.header}>
                        <div>
                            Recently Played Tracks
                        </div>
                    </div>
                    <div className={styles.tracks}>
                        <ul>
                            {
                                data.items.map((track, i) => {
                                    return (
                                        <Track track={track.track} key={i} />
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