var express = require('express');
var router = express.Router()
const posts = require('../models/posts');


router.get('/', (_req, res) => res.redirect('/test-result-page.html'));

router.get('/results/', async (req, res) => {
    const searchedPosts = await posts.searchPostsByCategory(req.query.searchKey,req.query.categoryKey);
    if (searchedPosts.results.length > 0)
        return res.status(200).json(searchedPosts);

    const randomApprovedPosts = await posts.getPosts();
    console.log("randomApprovedPosts: ", randomApprovedPosts);
    return res.status(200).json(randomApprovedPosts);
});

module.exports = router