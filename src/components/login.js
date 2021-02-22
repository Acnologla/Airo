import axios from "axios"
import { useRef, useContext } from "react"
import MainContext from "../context/main"

export default function login() {
    const context = useContext(MainContext)
    const username = useRef({})
    const password = useRef({})
    const login = (type) => {
        axios.post(`/api/auth/${type}`, {
            username: username.current.value,
            password: password.current.value
        }).then(response => {
            localStorage.setItem("token", response.data.token)
            context.setContext(response.data.user)
        }).catch(e => alert(e.message))
    }
    return (
        <center>
            <input ref={username} placeholder="username" id="username" />
            <br />
            <input ref={password} placeholder="password" id="password" />
            <br />
            <button onClick={() => login("login")}>Login</button>
            <br />
            <button onClick={() => login("register")}>register</button>
        </center>
    )
}