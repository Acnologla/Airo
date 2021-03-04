import { rateLimit, getRateLimit } from "@/src/lib/rateLimit"
import fs from "fs"

export default rateLimit(getRateLimit, async (req, res) => {
    const { id } = req.query
    if (!id) return res.send(400).end()
    try{
        const path = fs.readFileSync(`${process.cwd()}/assets/avatar/${id}.png`)
        res.setHeader('Content-Type', 'image/png')
        res.send(path)
    }catch(_){
        res.status(404).end()
    }
})