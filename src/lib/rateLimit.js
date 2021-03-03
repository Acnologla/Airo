import { RateLimiterMemory } from "rate-limiter-flexible"

export const getRateLimit = new RateLimiterMemory({
    points: 30, 
    duration: 2
});

export const loginRateLimit = new RateLimiterMemory({
    points: 5,
    duration: 60 * 30
})

export const patchRateLimit = new RateLimiterMemory({
    points: 2,
    duration: 60 * 30
})


export const rateLimit = (rateLimitType, callback) => {
    return (req,res) => {
        return new Promise(resolve => {
            const ip = req.headers['x-forwarded-for'] || (req.connection && req.connection.remoteAddress)
            rateLimitType.consume(ip, 1).then(async () => {
                await callback(req, res)
                resolve()
            }).catch(() => {
                res.status(429).end()
                resolve()
            })
        })
    }
}