import client from "../models/client.js"
export default async (req, res) => {
    if (req.method === "POST"){
        const {username, password} = req.body
        if (!username) return res.status(400).send("Invalid username");
        if (username.length > 50) return res.status(400).send("Invalid username");
        if (!password) return res.status(400).send("Invalid password");
        const [user] = await client.query("SELECT 1 FROM  Users WHERE username = $1 limit 1", [username])
        if (user){
            return res.status(401).send("Username arleady taken")
        }
        const date = Date.now()
        client.query("INSERT INTO Users(username, password, created) VALUES ($1, crypt($2, gen_salt('bf', 8), $3)", [username, password,date])
            .then(() => {
                res.json({username,date})
            }).catch(() => {
                res.sendStatus(500)
            })
    }
}