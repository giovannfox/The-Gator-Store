/**
 * Controller that will hold all the search related routes.
 */

var express = require('express');
var router = express.Router()
const posts = require('../models/posts');

/**
 * Root route that will used for redirecting to results page
 */
router.get('/', (_req, res) => res.redirect('/test-result-page.html'));

/**
 * Route used for getting the results based on category and search key.
 */
router.get('/results/', async (req, res) => {
    const searchedPosts = await posts.searchPostsByCategory(req.query.searchKey, req.query.categoryKey);
    if (searchedPosts.results.length > 0)
        return res.status(200).json(searchedPosts);

    const randomApprovedPosts = await posts.getPosts();
    return res.status(200).json(randomApprovedPosts);
});

module.exports = router