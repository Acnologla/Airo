import client from "@/models/client"
import needAuth from "@/src/utils/needAuth"

export default needAuth(async (req,res) => {
    const {userID: author} = req
    const {id} = req.query
    const result = await client.query(`SELECT * FROM Comments where id = $1`, [id])
    const [comment] = result.rows
    if (!comment) return res.status(404).end()
    if (comment.author !== author) return res.status(401).end()
    if (req.method === "DELETE"){
        await client.query(`DELETE FROM Comments where id = $1`, [id])
        res.status(200).end()
    }
})