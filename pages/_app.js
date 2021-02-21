import '../styles/globals.css'
import "tailwindcss/tailwind.css";
import Head from 'next/head'
import Nav from "../src/components/navbar"

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
         <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
     <Nav/>
     <Component {...pageProps} />
    </>
  )
}

export default MyApp
