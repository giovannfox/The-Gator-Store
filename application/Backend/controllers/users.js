/**
 * Controller that will be used for user actions like
 * registration and login.
 */
const express = require('express');
const router = express.Router();
const {
    userExists,
    insertUser
} = require("../models/userModel");


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
    
    if(!email.includes("mail.sfsu.edu"))
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
    insertUser(email, password)

    //on true 
    //redirect to login with status 400
    //message: user dne


    return res.status(200).redirect("/dashboard");
});

module.exports = router