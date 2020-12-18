const jwt = require('jsonwebtoken')
const JWT_SECRET = "CO0KIE_secret"

const validateCookie = (req, res, next) => {
    const token = req.cookies.token
    const user = {
        token
    }

    const decoded = jwt.decode(token, JWT_SECRET)

    if (!decoded){ 
        return res.redirect("/login.html");
        // return res.status(403).json({
        //     message: "You are not logged in!"
        // });
    }

    req.user = decoded
    next()
}

module.exports = {
    validateCookie
}