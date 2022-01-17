require('dotenv').config();
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;
const CLIENT_SECRET = process.env.NEXT_PUBLIC_CLIENT_SECRET;
const REDIRECT_URL = process.env.NEXT_PUBLIC_REDIRECT_URL;
const FRONTEND_URL = process.env.NEXT_PUBLIC_FRONTEND_URL;
const stateKey = 'SPOTIFY-AUTH-STATE';
const axios = require('axios').default;
const querystring = require('query-string');
import cookie from 'cookie'

export default function handler(req, res) {
    const code = req.query.code || null;
    const state = req.query.state || null;
    const storedState = req.cookies ? req.cookies[stateKey] : null;
    if (state === null || state !== storedState) {
        res.redirect(`${FRONTEND_URL}/#` +
            querystring.stringify({
                error: 'state_mismatch'
            })
        );
    } else {
        res.setHeader('Set-Cookie',cookie.serialize(stateKey,state,{
            maxAge:0
        }))
        const sendData = {
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: REDIRECT_URL
        };
        const authOptions = {
            method: 'post',
            url: 'https://accounts.spotify.com/api/token',
            data: querystring.stringify(sendData),
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64')
            }
        };

        axios(authOptions)
            .then((response) => {
                const access_token = response.data.access_token;
                const refresh_token = response.data.refresh_token;
                console.log("access_token=" + access_token + "refresh_token" + refresh_token);
                res.redirect(`${FRONTEND_URL}/#` + querystring.stringify({
                    access_token: access_token,
                    refresh_token: refresh_token
                }));
            })
            .catch((error) => {
                console.log(error);
                res.redirect(`${FRONTEND_URL}/#` +
                    querystring.stringify({
                        error: 'invalid_token'
                    }));
            });
    }
}