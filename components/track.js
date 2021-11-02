import styles from 'styles/track.module.css'
import Link from 'next/link'
import Image from 'next/image';

const formatDuration = millis => {
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

const Track = ({track}) => {
    return (
        <>
            <li>
                <Link href={track.external_urls.spotify}>
                    <a className={styles.container} target="_blank" rel="noopener noreferrer">
                        <div className={styles.artwork}>
                            <Image src={track.album.images[2].url} width="60px" height="60px" alt={track.name}/>
                        </div>
                        <div className={styles.meta}>
                            <span className={styles.metaleft}>
                                {/* <span className={styles.trackName}>
                                    {track.name}
                                </span> */}
                                <a className={styles.trackName} title={track.name}><span>{track.name}</span></a>
                                <div className={styles.trackAlbum}>
                                    {
                                        track.artists.map((artist, i) => (
                                            <span key={i}>
                                                {artist.name}
                                                {track.artists.length>0 && i=== track.artists.length - 1 ? '' : ','}&nbsp;
                                            </span>
                                        )
                                        )
                                    }
                                    &nbsp;&middot;&nbsp;&nbsp;
                                    {track.album.name}
                                </div>
                            </span>
                            <span className={styles.trackDuration}>
                                {formatDuration(track.duration_ms)}
                            </span>
                        </div>
                    </a>
                </Link>
            </li>
        </>
    );
};

export default Track;