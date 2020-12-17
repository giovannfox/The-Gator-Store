/**
 * Controller that will hold all the Post related routes.
 */

var express = require('express');
var router = express.Router()
const posts = require('../models/post');
const { validateCookie } = require("../helpers/getUserCookie");
const {upload} = require("../awsConnection.js");
const{itemKey} = require("../awsConnection.js");





/**
 * Used to get each off the post details.
 */
router.get('/:postId', async (req, res) => {
    const itemDetails = posts.getPostDetails(req.params.postId)
    .then((res) => res)
    .catch((err)=> res.status(500).send(err));

    res.jsonp(await (itemDetails));
});

/**
 * Recieves information for creating post, then will be redirect to user-dashboard 
 * Before it does anything checks if user is logged in
 */
/*
router.post('/',upload.any("file"), async(req,res)=>{
    //test();
    //console.log(itemKey);
    console.log(req.body);
    var postInfo = req.body;
   // console.log("https://csc648-team2.s3-us-west-1.amazonaws.com/"+date+".jpg");
    //postInfo["url"] = "hey";
    posts.createPost();
    //res.redirect("user-dashboard.html");
});
*/


module.exports = router