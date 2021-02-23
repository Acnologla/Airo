import authRequest from "../utils/authRequest"
import { useRef } from "react"
import { useRouter } from "next/router"


export default function createPost() {
    const content = useRef(null)
    const title = useRef(null)
    const router = useRouter()
    const submit = () => {
        authRequest("/api/posts", {
            method: "POST",
            data: {
                content: content.current.value,
                title: title.current.value
            }
        }).then(result => {
            router.push(`/posts/${result.data.id}`)
        }).catch(e => alert(e))
    }
    return (
        <div>
            <input placeholder="title" ref={title} />
            <input placeholder="content" ref={content} />
            <button onClick={submit}>Enviar</button>
        </div>
    )
}