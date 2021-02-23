import axios from "axios"
export default function authRequest(url,body){
    const token = localStorage.getItem("token")
    if(body.headers){
        body.headers.authorization = token
    }else{
        body.headers = {
            authorization: token
        }
    }
    body.url = url
    return axios(body)
}