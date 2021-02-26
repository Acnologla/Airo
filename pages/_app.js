import '@/styles/globals.css'
import "tailwindcss/tailwind.css";
import Head from 'next/head'
import Nav from "@/src/components/navbar"
import MainContext from "@/src/context/main"
import { useEffect, useState } from "react"
import axios from "axios"


function MyApp({ Component, pageProps }) {

  const [context, setContext] = useState({})
  useEffect(async () => {
    const token = localStorage.getItem("token")
    const _context = {
      setContext: (auth) => {
        const newContext = {
          auth
        }
        newContext.setContext = _context.setContext
        setContext(newContext)
      }
    }
    if (token) {
      try {
        const response = await axios.get("/api/users/@me", {
          headers: {
            authorization: token
          }
        })
        _context.auth = response.data
      } catch (_) {
        localStorage.removeItem("token")
      }
    }

    setContext(_context)
  }, [])
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <MainContext.Provider value={context}>
        <Nav />
        <div style={{marginTop: "40px"}}></div>
        <Component {...pageProps} />
      </MainContext.Provider>
    </>
  )
}

export default MyApp
