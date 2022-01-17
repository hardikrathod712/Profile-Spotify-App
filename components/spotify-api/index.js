import axios from "axios"

const EXPIRATION_TIME = 3600000 //3600 * 1000 milliseconds

const setTokenTimeStamp = () => {
    if (typeof window !== "undefined")
        localStorage.setItem('SPOTIFY_TOKEN_TIMESTAMP', Date.now())
};
const getTokenTimeStamp = () => {
    if (typeof window !== "undefined")
        return localStorage.getItem('SPOTIFY_TOKEN_TIMESTAMP');
}

const setLocalAccessToken = access_token => {
    setTokenTimeStamp();
    if (typeof window !== "undefined")
        return localStorage.setItem('SPOTIFY_ACCESS_TOKEN', access_token);
};
const getLocalAccessToken = () => {
    if (typeof window !== "undefined")
        return localStorage.getItem('SPOTIFY_ACCESS_TOKEN');
}

const setLocalRefreshToken = refresh_token => {
    if (typeof window !== "undefined")
        localStorage.setItem('SPOTIFY_REFRESH_TOKEN', refresh_token);
}
const getLocalRefreshToken = () => {
    if (typeof window !== "undefined")
        return localStorage.getItem('SPOTIFY_REFRESH_TOKEN');
}

const getHashParams = () => {
    const hashParams = {};
    let e;
    const r = /([^&;=]+)=?([^&;]*)/g;
    if (typeof window !== "undefined")
        var q = location.hash.substring(1);
    while ((e = r.exec(q))) {
        hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
}

const refreshAccessToken = async () => {
    const refresh_token = await axios(`http://localhost:3000/api/refreshToken?refresh_token=${getLocalRefreshToken()}`)
        .then(response => {
            const access_token = response.data.access_token;
            setLocalAccessToken(access_token);
            console.log("Refreshed Access Token: " + access_token)
            if (typeof window !== "undefined")
                location.reload();
            return access_token;
        })
        .catch(error => console.error(error));
    return refresh_token;
}

const getAccessToken = () => {
    const { error, access_token, refresh_token } = getHashParams();
    if (error) {
        refreshAccessToken();
    }
    if (Date.now() - getTokenTimeStamp() >= EXPIRATION_TIME) {
        console.log("Enter Refresh");
        refreshAccessToken();
    }
    const localAccessToken = getLocalAccessToken();
    if ((!localAccessToken || localAccessToken === 'undefined') && access_token) {
        setLocalAccessToken(access_token);
        setLocalRefreshToken(refresh_token);
        return access_token;
    }
    return localAccessToken;
}

export const access_token = getAccessToken();

export const logout = () => {
    if (typeof window !== "undefined") {
        localStorage.removeItem('SPOTIFY_TOKEN_TIMESTAMP');
        localStorage.removeItem('SPOTIFY_ACCESS_TOKEN');
        localStorage.removeItem('SPOTIFY_REFRESH_TOKEN');
    }
}