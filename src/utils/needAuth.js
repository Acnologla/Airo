import { verify } from "jsonwebtoken"
export default (callback) => {
    const token = req.headers["authorization"]
    verify(token, process.env.SECRET, function(err, decoded) {
        if (err) return res.status(401).send("Invalid token")
        req.userId = decoded.id;
        callback(req,res)
      });
}