import { verify } from "jsonwebtoken"
export default (callback) => {
  return (req, res) => {
    return new Promise(resolve => {
      const token = req.headers["authorization"]
      verify(token, process.env.SECRET, async function (err, decoded) {
        if (err) {
          resolve()
          return res.status(401).send("Invalid token")
          }
        req.userID = decoded.id;
        await callback(req, res)
        resolve()
        })
    })
  }

}