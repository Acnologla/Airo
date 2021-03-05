import {rateLimit, getRateLimit} from "@/src/lib/rateLimit"
import client from "@/models/client"
import {formatDate} from "@/src/utils/utils"

export default rateLimit(getRateLimit, async(req, res) => {
    const {query} = req.query
    if (!query) return res.status(400).end()
    try{
        const resultPosts = await client.query("SELECT * FROM Posts INNER JOIN(SELECT postId,COUNT(*) as comments From Comments group by postId) as q ON postId = id  where title ~ $1", [query])
        const resultUsers = await client.query("SELECT id, username, created, posts from Users INNER JOIN (SELECT COUNT(*) as posts, author From posts group by author) as q ON author = Users.id where username ~ $1", [query])
        for (const user of resultUsers.rows){
            user.created = formatDate(user.created)
        }
        for (const post of resultPosts.rows){
            post.created = formatDate(post.created)
        }
        return res.json({
            users: resultUsers.rows,
            posts: resultPosts.rows
        })
    }catch(e){
        console.log(e)
        res.status(500).end()
    }
})