import client from "@/models/client"
import { formatDate } from "@/src/utils/utils"
import Comment from "@/src/components/comment"
import useSWR, { mutate } from "swr"
import axios from "axios"
import { useRef, useContext } from "react"
import mainContext from "@/src/context/main"
import authRequest from "@/src/utils/authRequest"
import upvote from "@/src/utils/upvote"

export default function Post({ post }) {
    if (!post || !post.id) return <h1>Not found</h1>
    const context = useContext(mainContext)
    const content = useRef(null)
    const { data: comments } = useSWR(`/api/comments?type=0&id=${post.id}`, (...args) => axios.get(...args).then(res => res.data), {
        refreshInterval: 1000 * 20
    })
    if (!comments) return <h1>Loading...</h1>
    const sendComment = () => {
        const commentContent = content.current.value
        if (commentContent) {
            authRequest("/api/comments", {
                method: "post",
                data: {
                    target: {
                        id: post.id,
                        type: 0
                    },
                    content: commentContent
                }
            })
                .then(() => mutate(`/api/comments?type=0&id=${post.id}`))
                .catch(e => alert(e.message))
        }
    }
    return (
        <section>
            {context.auth &&
                <div>
                    <input placeholder="content" ref={content} />
                    <button onClick={sendComment}>Enviar comentario</button>
                </div>
            }
            <h1>{post.title}</h1>
            <p>{post.content}</p>
            <button onClick={() => upvote(post.id, 0, false)}>Like</button>
            <br></br>
            <button onClick={() => upvote(post.id, 0, true)}>Dislike</button>
            <p>{post.author.username}</p>
            <p>{post.created}</p>
            <section>
                <br />
                <h2>Comentarios</h2>
                {comments.map((comment, i) => <Comment key={i} comment={comment} />)}
            </section>
        </section>
    )

}
export async function getStaticPaths() {
    return {
        paths: [],
        fallback: true
    }
}
export async function getStaticProps({ params }) {
    if (isNaN(params.id)) {
        params.id = -1
    }
    const result = await client.query("SELECT * FROM Posts where id = $1", [params.id])
    const [post] = result.rows
    if (post) {
        const author = await client.query("SELECT id, username FROM Users where id = $1", [result.rows[0].author])
        post.author = author.rows[0]
        post.created = formatDate(post.created)
        const upvotesResult = await client.query("SELECT COUNT(*) FILTER (where isDislike is true) AS disLikes, COUNT(*) FILTER (where isDislike is false) AS likes FROM Upvote WHERE postId = $1", [post.id])
        const [{ likes, dislikes }] = upvotesResult.rows
        post.likes = likes
        post.dislikes = dislikes
    }
    return {
        props: {
            post: post || {}
        },
        revalidate: 120
    }
}