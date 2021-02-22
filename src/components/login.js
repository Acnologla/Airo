import axios from "axios"
import {useRef, useContext} from "react"
import MainContext from "../context/main"

export default function login() {
    const context = useContext(MainContext)
    const username = useRef({})
    const password = useRef({})
    const login = (type) => {
        console.log(context)    
        if (type === "login"){
            axios.post("/api/auth/login", {
                username: username.current.value,
                password: password.current.value
            }).then(response => {  
                localStorage.setItem("token",response.data.token)
                context.auth = response.data.user
                context.setContext({
                    auth: context.auth,
                    theme: context.theme
                })
            }).catch(e => alert(e.message))
        }else{
            axios.post("/api/auth/register", {
                username: username.current.value,
                password: password.current.value
            }).then(response => {  
                localStorage.setItem("token",response.data.token)
                context.auth = {
                    username: username.current.value,
                    date: response.data.date,
                    id: response.data.id
                }
                context.setContext({
                    auth: context.auth,
                    theme: context.theme
                })
            }).catch(e => alert(e.message))
        }
    }
    return (
        <center>
            <input ref={username} placeholder="username" id="username"/>
            <br/>
            <input ref={password} placeholder="password" id="password"/>
            <br/>
            <button onClick={() => login("login")}>Login</button>
            <br/>
            <button onClick={() => login("register")}>register</button>
        </center>
    )
}