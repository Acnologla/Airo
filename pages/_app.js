import '../styles/globals.css'
import "tailwindcss/tailwind.css";
import Nav from "../src/components/navbar"

function MyApp({ Component, pageProps }) {
  return (
    <>
     <Nav/>
     <Component {...pageProps} />
    </>
  )
}

export default MyApp
