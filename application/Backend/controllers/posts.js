/**
 * Controller that will hold all the Post related routes.
 */

var express = require('express');
var router = express.Router()
const posts = require('../models/post');

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
 
router.post('/', (req,res,next)=>{validateCookie(req,res,next)},upload.any("file"), function(req,res,next){
    var postInfo = req.body;
    postInfo["url"] = "hey";
    console.log(postInfo);
    //createPost(postInfo);
    //alert("Post has been created");
    //res.redirect("user-dashboard.html");
    //res.redirect("login.html");
});




module.exports = router