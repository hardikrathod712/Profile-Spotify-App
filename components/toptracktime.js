import styles from 'styles/profile.module.css'
import Link from 'next/link'
import Image from 'next/image'
import useSWR from 'swr';
import axios from 'axios';
import Loader from './loader';
import { access_token } from './spotify-api';
import Track from './track';

const fetcher = async url => {
    const data = await axios({
        method: 'GET',
        url: url,
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    }).then(response => response.data);
    return data;
}

// const data = [
//     { "img": "https://i.scdn.co/image/ab6761610000e5eb28f8b68ea703b22fc0c8be11", "name": "Joji" },
//     { "img": "https://i.scdn.co/image/ab6761610000e5eb28f8b68ea703b22fc0c8be11", "name": "Joji" },
//     { "img": "https://i.scdn.co/image/ab6761610000e5eb28f8b68ea703b22fc0c8be11", "name": "Joji" },
//     { "img": "https://i.scdn.co/image/ab6761610000e5eb28f8b68ea703b22fc0c8be11", "name": "Joji" },
//     { "img": "https://i.scdn.co/image/ab6761610000e5eb28f8b68ea703b22fc0c8be11", "name": "Joji" },
//     { "img": "https://i.scdn.co/image/ab6761610000e5eb28f8b68ea703b22fc0c8be11", "name": "Joji" },
//     { "img": "https://i.scdn.co/image/ab6761610000e5eb28f8b68ea703b22fc0c8be11", "name": "Joji" },
//     { "img": "https://i.scdn.co/image/ab6761610000e5eb28f8b68ea703b22fc0c8be11", "name": "Joji" },
//     { "img": "https://i.scdn.co/image/ab6761610000e5eb28f8b68ea703b22fc0c8be11", "name": "Joji" },
//     { "img": "https://i.scdn.co/image/ab6761610000e5eb28f8b68ea703b22fc0c8be11", "name": "Joji" }
// ];

export default function TopTrackAllTime() {
    const { data, error } = useSWR("https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=10", fetcher);
    if (error) return <div>Failed to Load {console.log(error)}</div>
    if (!data) return (
        <Loader />
    )
    return (
        <>
            <div className={styles.topArtists}>
                <div className={styles.topArtistsHead}>
                    <h3 className="text-xl font-black">Top Tracks of all time</h3>
                    <Link href="/toptracks">
                        <a className={styles.seemore}>See More</a>
                    </Link>
                </div>
                <div>
                    <ul>
                        {
                            data.items.map((track, i) => <Track track={track} key={i}/> )
                        }
                    </ul>
                </div>
            </div>
        </>
    )
}