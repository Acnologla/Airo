import client from "../../models/client"
import needAuth from "../../src/utils/needAuth"

/*
    type  0 = post comment
    type  1 = comment comment
*/

export default async (req, res) => {
    if (req.method === "POST") {
        return needAuth(async (req, res) => {
            const { content, target } = req.body
            const author = req.userID
            if (!content || !target) return res.status(400).end()
            const created = new Date()
            const query = `INSERT INTO Comments(${parseInt(target.type) === 0 ? "postId" : "commentId"}, content, author, created) VALUES ($1, $2, $3, $4) RETURNING id`
            try{
                const result = await client.query(query, [target.id, content, author, created])
                res.json({id: result.rows[0].id})
            }catch(e){
                console.log(e)
                res.status(400).end()
            }
        })(req,res)
    } else if (req.method === "GET") {
        const {type, id} = req.query
        if (!id || !type) return res.status(400).end()
        const query = `SELECT * FROM Comments WHERE ${parseInt(type) === 0 ? "postId" : "commentId"} = $1`
        const result = await client.query(query, [id])
        return res.json(result.rows)
    }
}