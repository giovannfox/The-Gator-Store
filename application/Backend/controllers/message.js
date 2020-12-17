var express = require('express');
var router = express.Router();
const { validateCookie } = require("../helpers/getUserCookie");
const {upload} = require("../awsConnection.js");
var m = require("../models/messageModel.js");

router.post("/",(req,res,next)=>{validateCookie(req,res,next)},upload.none(), async(req,res)=>{
    //m.insertMessage
    const post_id = req.body.postid;
    const message = req.body.message;
    console.log(post_id)
    console.log(message)
    const messageInserted = await m.insertMessage(post_id,message)
    if(messageInserted==false)
        return res
            .status(400)
            .json({
                "message": "Error Inserting Message."
            });

    return res.re; 
})

module.exports = router