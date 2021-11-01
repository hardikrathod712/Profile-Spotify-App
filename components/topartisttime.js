import styles from 'styles/profile.module.css'
import Link from 'next/link';
import Image from 'next/image';

import axios from 'axios';
import useSWR from 'swr';
import { access_token } from './spotify-api';
import Loader from './loader';

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

export default function TopArtistAllTime() {
    const { data, error } = useSWR("https://api.spotify.com/v1/me/top/artists?limit=10&time_range=long_term", fetcher);
    if (error) return <div>Failed to Load</div>
    if (!data) return (
        <Loader />
    )
    return (
        <>
            <div className={styles.topArtists}>
                <div className={styles.topArtistsHead}>
                    <h3 className="text-xl font-black">Top Artists of all time</h3>
                    <Link href="/topartists" passHref>
                        <a className={styles.seemore}>See More</a>
                    </Link>
                </div>
                <div>
                    <ul>
                        {
                            data.items.map((artist, i) => {
                                return (
                                    <li className={styles.artist} key={i}>
                                        <div className={styles.artistImg}>
                                            <Link href={artist.external_urls.spotify} passHref>
                                                <Image src={artist.images[2].url} width="60px" height="60px" alt={artist.name}/>
                                            </Link>
                                        </div>
                                        <Link href={artist.external_urls.spotify} passHref>
                                            <a className={styles.artistName} target="_blank" rel="noopener noreferrer"><span>{artist.name}</span></a>
                                        </Link>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        </>
    );
}