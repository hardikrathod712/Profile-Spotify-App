import Head from "next/head"
import Profile from "./profile"
import { access_token } from "components/spotify-api"
import Login from "pages/login"

export default function Home() {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Spotify Profile</title>
      </Head>
      { access_token ? <Profile /> : <Login /> }
    </>
  )
}
