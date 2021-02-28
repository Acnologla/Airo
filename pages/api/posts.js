import client from "@/models/client"
import needAuth from "@/src/utils/needAuth"
import { rateLimit, loginRateLimit, getRateLimit } from "@/src/lib/rateLimit"

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
        }))(req,res)
    } else if (req.method === "GET") {
        return rateLimit(getRateLimit, async (req, res) => {
            const limit = req.query.limit || 20
            const result = await client.query("SELECT * FROM Posts LIMIT $1", [limit])
            return res.json(result.rows)
        })(req, res)
    }
}