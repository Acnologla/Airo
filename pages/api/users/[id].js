import needAuth from "@/src/utils/needAuth"
import getUser from "@/src/utils/getUser"
import { rateLimit, getRateLimit } from "@/src/lib/rateLimit"

export default rateLimit(getRateLimit, async (req, res) => {
    const { id } = req.query
    if (!id) return res.send(400).end()
    if (id === "@me") {
        return needAuth(async (_, res) => {
            const userData = await getUser(req.userID)
            return res.json(userData)
        })(req, res)
    }
    const userData = await getUser(id)
    return res.json(userData)
})