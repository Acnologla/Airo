import { formatDate } from "../utils/utils";
import useSWR, { mutate } from "swr"
import axios from "axios"
import { useRef, useContext } from "react"
import mainContext from "@/src/context/main"
import authRequest from "@/src/utils/authRequest"
import upvote from "@/src/utils/upvote"

export default function Comment({ comment }) {
    const context = useContext(mainContext)
    const content = useRef(null)
    const { data: comments } = useSWR(`/api/comments?type=1&id=${comment.id}`, (...args) => axios.get(...args).then(res => res.data), {
        refreshInterval: 1000 * 20
    })
    if (!comments) return <h1>Loading</h1>
    const sendComment = () => {
        const commentContent = content.current.value
        if (commentContent) {
            authRequest("/api/comments", {
                method: "post",
                data: {
                    target: {
                        id: comment.id,
                        type: 1
                    },
                    content: commentContent
                }
            })
                .then(() => mutate(`/api/comments?type=1&id=${comment.id}`))
                .catch(e => alert(e.message))
        }
    }
    return (
        <section style={{ marginLeft: "20px", backgroundColor: "grey", marginBottom: "20px" }}>
            {context.auth && context.auth.id === comment.author.id ?
                <div>
                    <button onClick={() => authRequest(`/api/comments/${comment.id}`, {
                        method: "DELETE"
                    })}>Deletar</button>                
                    </div>
                : <></>}
            <h1>{comment.author.username}</h1>
            <p>{comment.content} <br /> {formatDate(comment.created)} </p>
            <button onClick={() => upvote(comment.id, 1, false)}>Like</button>
            <br></br>
            <button onClick={() => upvote(comment.id, 1, true)}>Dislike</button>
            {context.auth && <div style={{ width: "70%" }}>
                <input ref={content} placeholder="content" />
                <button onClick={sendComment}>Enviar</button>
            </div>}
            {comments.map((comment, i) => <Comment comment={comment} key={i} />)}
        </section >
    )
}