import client from "../../../models/client"
import { sign } from "jsonwebtoken"

export default async (req, res) => {
    if (req.method === "POST"){
        const {username, password} = req.body
        const result = await client.query(
            "SELECT id, created, username FROM Users WHERE username = $1 and password = crypt($2, password)",
            [username,password])
        const [user] = result.rows
        if (!user){
           return res.status(401).send("Invalid credentials")
        }
        const token = sign({id: user.id}, process.env.SECRET,{
            expiresIn: 604800 //1 week
        })
        res.status(200).json({token,user})
    }
}