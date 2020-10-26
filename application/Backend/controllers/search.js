var express = require('express');
var router = express.Router()
const posts = require('../models/posts');


router.get('/', (_req, res) => res.redirect('/test-result-page.html'));

router.get('/results/:searchKey', async (req, res) => {
    const searchedPosts = await posts.searchPostsByCategory("c",req.params.searchKey);
    if (searchedPosts.results.length > 0)
        return res.status(200).json(searchedPosts);

    const randomApprovedPosts = await posts.getPosts();
    return res.status(200).json(randomApprovedPosts);
});

router.get('/results/', async (req, res) => {const searchedPosts = await posts.searchPostsByCategory("c",req.params.searchKey);
    const randomApprovedPosts = await posts.getPosts();
    return res.status(200).json(randomApprovedPosts);
});

module.exports = router