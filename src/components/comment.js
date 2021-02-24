import { formatDate } from "../utils/utils";

export default function Comment({ comment }) {
    return (
        <section>
            <h1>{comment.author.username}</h1>
            <p>{comment.content} <br/> {formatDate(comment.created)} </p>
            </section >
    )
}