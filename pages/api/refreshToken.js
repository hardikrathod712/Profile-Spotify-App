require('dotenv').config();
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;
const CLIENT_SECRET = process.env.NEXT_PUBLIC_CLIENT_SECRET;

const axios = require('axios').default;
const querystring = require('query-string');

export default function handler(req, res) {
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
}