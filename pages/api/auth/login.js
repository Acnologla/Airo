import client from "../models/client.js"
import { sign } from "jsonwebtoken"

export default async (req, res) => {
    if (req.method === "POST"){
        const {username, password} = req.body
        const [user] = await client.query(
            "SELECT * EXCEPT password FROM  Users WHERE username = $1 and password = crypt($2, gen_salt('bf', 8))",
            [username,password])
        if (!user){
           return res.status(401).send("Invalid credentials")
        }
        user.token = sign({id: user.id}, process.env.SECRET,{
            expiresIn: 604800 //1 week
        })
        res.status(200).json(user)
    }
}