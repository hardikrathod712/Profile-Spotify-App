require('dotenv').config();
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;
const REDIRECT_URL = process.env.NEXT_PUBLIC_REDIRECT_URL;
const stateKey = 'SPOTIFY-AUTH-STATE';
const querystring = require('query-string');
import cookie from "cookie";

const generateRandomString = length => {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}
export default function handler(req, res) {
    const state = generateRandomString(16);
    res.setHeader('Set-Cookie', cookie.serialize(stateKey, state))
    const scope = "ugc-image-upload user-read-private user-read-email playlist-read-private playlist-modify-public playlist-modify-private playlist-read-collaborative user-top-read user-read-recently-played user-follow-modify user-follow-read";
    res.redirect(
        'https://accounts.spotify.com/authorize?' +
        querystring.stringify({
            client_id: CLIENT_ID,
            response_type: 'code',
            redirect_uri: REDIRECT_URL,
            scope: scope,
            state: state
        }));
}