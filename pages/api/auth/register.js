import client from "../../../models/client"
import { sign } from "jsonwebtoken"
export default async (req, res) => {
    if (req.method === "POST") {
        const { username, password } = req.body
        if (!username) return res.status(400).send("Invalid username");
        if (username.length > 50) return res.status(400).send("Invalid username");
        if (!password) return res.status(400).send("Invalid password");
        const result = await client.query("SELECT 1 FROM  Users WHERE username = $1 limit 1", [username])
        const [user] = result.rows
        if (user) {
            return res.status(401).send("Username arleady taken")
        }
        const date = Date.now()
        client.query(
            "INSERT INTO Users(username, password, created) VALUES ($1, crypt($2, gen_salt('bf')), to_timestamp($3)) RETURNING id",
            [username, password, date])
            .then((response) => {
                const [{id}] = response.rows
                const token = sign({id}, process.env.SECRET, {
                    expiresIn: 604800 //1 week
                })
                res.json({ token, date, id})
            }).catch((e) => {
                console.log(e)
                res.status(500).end()
            })
    }
}