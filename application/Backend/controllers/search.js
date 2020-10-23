var express = require('express');
var router = express.Router()
const posts = require('../models/posts');


router.get('/', (_req, res) => res.redirect('/test-result-page.html'))
router.get('/results/:searchKey', async (req, res) => {
    const thePosts = await posts.searchPostsByCategory(req.params.searchKey);
    return res.status(200).json(thePosts)
});

module.exports = router