/**
 * Controller that will hold all the Post related routes.
 */

var express = require('express');
var router = express.Router()
const posts = require('../models/post');
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
    postInfo["url"] = "hey";
    //createPost(postInfo);
    res.redirect("user-dashboard.html");
});

const validateCookie = async(req,res,next)=>{
    const cookies = req.cookies
    
    const token = cookies && cookies.token
    try{
        const decode = jwt.verify(token, JWT_SECRET);
        return next();
    }catch(e){
        console.log("error decoding:", e);
        res.redirect("login.html")
        return res.status(400).send(e.message)
    }
}


module.exports = router