/**
 * Controller that will hold all the Post related routes.
 */

var express = require('express');
var router = express.Router()
const posts = require('../models/post');
const { validateCookie } = require("../helpers/getUserCookie");
//var aws = require('aws-sdk');
var multer = require('multer');
//var multerS3 = require('multer-s3');

var upload = multer()

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

router.post('/', async(req,res,next)=>{validateCookie(req,res,next)},async(req,res,next)=>{
    var postInfo = req.body;
    console.log(re.user.id);
    //postInfo["url"] = "hey";
    //createPost(postInfo);
    res.redirect("user-dashboard.html");
});

module.exports = router