var express = require('express');
var router = express.Router()
const db = require('../dbConnection');


router.get('/err', function (req, res) {
    res.send("Please enter a search key")
});

router.get('/results/:searchKey', function (req, res) {
    const client = db.client()
    client.query('SELECT * FROM Posts', function (err, results, fields) {
        if (err) throw err
        res.send(results)
    })
});

module.exports = router