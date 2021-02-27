import client from "@/models/client"
import needAuth from "@/src/utils/needAuth"
import { rateLimit, getRateLimit } from "@/src/lib/rateLimit"
export default rateLimit(getRateLimit, needAuth(async (req, res) => {
    if (req.method === "POST") {
        const { userID } = req
        const { isDislike, target, type } = req.body
        if (!target) return res.status(400).end()
        const queryType = parseInt(type) === 0 ? "postId" : "commentId"
        const result = await client.query(`SELECT * FROM Upvote WHERE author = $1 and ${queryType} = $2`, [userID, target])
        const [exists] = result.rows
        if (exists) {
            if (exists.isdislike === isDislike) {
                return res.status(200).send("noChange")
            }
            return client.query(`UPDATE Upvote SET isDislike = $1 WHERE author = $2 and ${queryType}= $3`, [isDislike, userID, target]).then(() => {
                res.status(200).end()
            }).catch(() => res.status(400).end())
        }
        return client.query(`INSERT INTO Upvote(author, isDislike, ${queryType}) VALUES ($1, $2, $3)`, [userID, isDislike, target]).then(() => {
            res.status(200).end()
        }).catch(() => res.status(400).end())

    }
}))