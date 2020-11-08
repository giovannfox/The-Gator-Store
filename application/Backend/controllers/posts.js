/**
 * Controller that will hold all the search related routes.
 */

var express = require('express');
var router = express.Router()
const posts = require('../models/post');


/**
 * Used to get each off the post details.
 */
router.get('/:postId', async (req, res) => {
    const itemDetails = posts.getPostDetails(req.params.postId)
    .then((res) => res)
    .catch((err)=> res.status(500).send(err));

    res.jsonp(await (itemDetails));
});


module.exports = router