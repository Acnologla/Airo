import client from "@/models/client"
import needAuth from "@/src/utils/needAuth"

export default needAuth(async (req,res) => {
    const {userID: author} = req
    const {id} = req.query
    const result = await client.query(`SELECT * FROM Posts where id =$1`, [id])
    const [post] = result.rows
    if (!post) return res.status(404).end()
    if (post.author !== author) return res.status(401).end()
    if (req.method === "DELETE"){
        await client.query(`DELETE FROM Posts where id = $1`, [id])
        res.status(200).end()
    }
})