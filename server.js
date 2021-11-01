require('dotenv').config();

const PORT = 8888;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URL = process.env.REDIRECT_URL;
const FRONTEND_URL = process.env.FRONTEND_URL;
const stateKey = 'SPOTIFY-AUTH-STATE';

const express = require('express');
const axios = require('axios').default;
const cors = require('cors');
const querystring = require('query-string');
const cookieParser = require('cookie-parser');
const app = express();

app.use(cors()).use(cookieParser());

const generateRandomString = length => {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

// app.get('/', function (req, res) {
//     res.render(path.resolve(__dirname, '../spotify-profile/.next/server/pages/index.html'));
//   });

app.get("/login", (req, res) => {
    const state = generateRandomString(16);
    res.cookie(stateKey, state);

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
})

app.get("/callback", (req, res) => {

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
        res.clearCookie(stateKey);
        // console.log(code);
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
})

app.get('/refresh_token', (req, res) => {
    const refresh_token = req.query.refresh_token;
    const body = {
        grant_type: 'refresh_token',
        refresh_token: refresh_token
    }
    const authOptions = {
        method: 'post',
        url: 'https://accounts.spotify.com/api/token',
        data: querystring.stringify(body),
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64')
        }
    };
    axios(authOptions)
        .then(response => {
            const access_token = response.data.access_token;
            console.log("Refresh Token: " + access_token);
            res.send({
                access_token: access_token
            })
        })
        .catch(error => console.error(error));
})
app.listen(PORT, () => {
    console.log("Server Running at " + PORT);
})