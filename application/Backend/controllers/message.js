var express = require('express');
var router = express.Router();
const {
    validateCookie
} = require("../helpers/getUserCookie");
const {
    upload
} = require("../awsConnection.js");
const {
    insertMessage,
    getMessagesBySellerId,
    getMessagesByBuyerId
} = require("../models/messageModel.js");

router.post("/create", validateCookie, async (req, res) => {
    const postId = req.body.postid;
    const message = req.body.message;
    const userId = req.user.id;
    console.log(req.user)
    const messageInserted = await insertMessage(postId, message, userId)
    if (messageInserted == false)
        return res
            .status(400)
            .json({
                "message": "Error Inserting Message."
            });
    return res.json({
        sucess: true
    });
})

router.get("/get/seller/:userId", async (req, res) => {
    const userId = req.params.userId;

    const messages = await getMessagesBySellerId(userId)

    if (!messages)
        return res
            .status(400)
            .json({
                "message": "Error finding messages."
            });
    return res.json({
        ...messages
    });
})

router.get("/get/buyer/:userId", async (req, res) => {
    const userId = req.params.userId;

    const messages = await getMessagesByBuyerId(userId)

    if (!messages)
        return res
            .status(400)
            .json({
                "message": "Error finding messages."
            });
    return res.json({
        ...messages
    });
})

module.exports = router