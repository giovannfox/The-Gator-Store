const jwt = require('jsonwebtoken')
const JWT_SECRET = "CO0KIE_secret"

const validateCookie = (req, res, next) => {
    const token = req.cookies.token
    const user = {
        token
    }

    const decoded = jwt.decode(token, JWT_SECRET)

    if (!decoded) return res.json({
        message: "No cookie found"
    })

    req.user = decoded
    console.log("user", user)
    next()
}

module.exports = {
    validateCookie
}