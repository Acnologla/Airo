import client from "../../models/client"
import { formatDate } from "../../src/utils/utils"

export default function Post({ post }) {
    if (!post || !post.id) return <h1>Not found</h1>
    return (
        <section>
            <h1>{post.title}</h1>
            <p>{post.content}</p>
            <p>{post.author.username}</p>
            <p>{post.created}</p>
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
    if(isNaN(params.id)){
        params.id = -1
    }
    const result = await client.query("SELECT * FROM Posts where id = $1", [params.id])
    const [post] = result.rows
    if (post){
        const author = await client.query("SELECT id, username FROM Users where id = $1", [result.rows[0].author])
        post.author = author.rows[0]
        post.created = formatDate(post.created)
    } 
    return {
        props: {
            post: post || {} 
        },
        revalidate: 120
    }
}