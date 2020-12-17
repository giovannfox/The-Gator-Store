/**
 * Controller that will hold all the Post related routes.
 */

var express = require('express');
var router = express.Router()
const posts = require('../models/post');
const { validateCookie } = require("../helpers/getUserCookie");
const {upload,url,itemkey} = require("../awsConnection.js");
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

router.post('/',upload.any("file"), async(req,res)=>{
    const postInserted = await posts.createPost(req.body.title, 4,req.body.price, req.body.description, url,32);
    if(postInserted==false)
        return res
            .status(400)
            .json({
                "message": "Error Inserting Post."
            });
    res.redirect("user-dashboard.html");
    return;
});



module.exports = router