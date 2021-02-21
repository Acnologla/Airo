import {useContext, createContext} from "react"
import Content from "../src/components/content.js"
import axios from "axios"

const Context = createContext({
  theme: "white",
  auth: null,
});

export default function Home() {
  return (
    <Context.Provider value={{}}>
      <Content />
    </Context.Provider>
  )
}
