var express = require('express')
var router = express.Router()

router.get('/err', function (req, res) {
    res.send("Please enter a search key")
});

router.get('/results/:searchKey', function (req, res) {
    res.send(req.params.searchKey)
});

module.exports = router