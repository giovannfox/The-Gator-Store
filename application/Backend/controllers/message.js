var express = require('express');
var router = express.Router();
const { validateCookie } = require("../helpers/getUserCookie");
const {upload} = require("../awsConnection.js");
const
{insertMessage,
getMessages
} = require("../models/messageModel.js");

router.post("/",upload.none(), async(req,res)=>{
    const post_id = req.body.postid;
    const message = req.body.message;
    const messageInserted = await insertMessage(post_id,message,32)
    if(messageInserted==false)
        return res
            .status(400)
            .json({
                "message": "Error Inserting Message."
            });
            console.log(await getMessages(4))
    return; 
})

module.exports = router