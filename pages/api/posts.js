import client from "@/models/client"
import needAuth from "@/src/utils/needAuth"
import { rateLimit, loginRateLimit, getRateLimit } from "@/src/lib/rateLimit"
import { formatDate } from "@/src/utils/utils"

export default async (req, res) => {
    if (req.method === "POST") {
        return rateLimit(loginRateLimit, needAuth(async (req, res) => {
            const { title, content } = req.body
            const author = req.userID
            if (!title || !content) return res.status(400).end()
            const created = new Date()
            try {
                const result = await client.query("INSERT INTO Posts(title,content, author, created) VALUES ($1, $2, $3, $4) RETURNING id", [title, content, author, created])
                res.json({ id: result.rows[0].id })
            } catch (e) {
                console.log(e)
                res.status(400).end()
            }
        }))(req, res)
    } else if (req.method === "GET") {
        return rateLimit(getRateLimit, async (req, res) => {
            const limit = req.query.limit || 20
            const sort = req.query.sort
            let query = "SELECT * FROM Posts"
            if (sort === "1") {
                query += ` LEFT JOIN (
                    SELECT postid, count(*) as likes from Upvote 
                    where isDislike = false
                    group by postid
                ) UPVOTE ON id = postid ORDER BY likes`
            }
            query += " LIMIT $1"
            const result = await client.query(query, [limit])
            for (const post of result.rows) {
                post.created = formatDate(post.created)
                const commentsResult = await client.query("SELECT COUNT(*) FROM Comments where postId = $1", [post.id])
                post.comments = commentsResult.rows[0].count
                const upvotesResult = await client.query("SELECT COUNT(*) FILTER (where isDislike is true) AS disLikes, COUNT(*) FILTER (where isDislike is false) AS likes FROM Upvote WHERE postId = $1", [post.id])
                const [{ likes, dislikes }] = upvotesResult.rows
                post.likes = likes
                post.dislikes = dislikes
            }
            return res.json(result.rows)
        })(req, res)
    }
}