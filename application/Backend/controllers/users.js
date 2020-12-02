/**
 * Controller that will be used for user actions like
 * registration and login.
 */
const express = require('express');
const router = express.Router();
const {
    userExists,
    insertUser,
    getUser
} = require("../models/userModel");
const jwt = require('jsonwebtoken');
const {
    compare
} = require("bcrypt");
const JWT_SECRET = "CO0KIE_secret"


/**
 * Registration route.
 * checks for mail.sfsu.edu
 * Author: Ramy Fekry
 */
router.post('/register', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password)
        return res
            .status(400)
            .json({
                "message": "Please enter an email or password!"
            })

    if (!email.includes("mail.sfsu.edu"))
        return res
            .status(400)
            .json({
                "message": "could not verify that you are a student or facutly."
            });

    //check if email exists in db
    const isUserExists = userExists(email)

    if (isUserExists)
        return res
            .status(400)
            .json({

                "message": "User exists in db."
            });

    //store email and password in db
    await insertUser(email, password)

    return res.status(200).redirect("/dashboard");
});

/**
 * Login route.
 * Author: Ramy Fekry
 */
router.post('/login', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password)
        return res
            .status(400)
            .json({
                "message": "Please enter an email and password!"
            })

    const user = await getUser(email);

    const correctPassword = await compare(password, user.password)

    if (correctPassword === false) {
        return res.status(403).send("Bad User password or email") /* .redirect("/user/login") */ ;
    }

    delete user.password
    const signedCookie = jwt.sign({
        ...user
    }, JWT_SECRET, {
        expiresIn: "1h"
    })

    return res.status(200).cookie("token", signedCookie).jsonp(user);
});

module.exports = router