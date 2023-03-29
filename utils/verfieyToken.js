const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    const token = req.cookies.token

    if (!token) {
        throw new Error("You are not auth!")
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            throw new Error("Token not valide")
        }
        req.user = user
        next()
    })
}

module.exports = verifyToken