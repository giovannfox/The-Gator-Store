var express = require('express');
var router = express.Router()
const db = require('../dbConnection');


router.get('/err', function (req, res) {
    res.send("Please enter a search key")
});

router.get('/results/:searchKey', function (req, res) {
    const client = db.client()
    client.query("SELECT * FROM dev.Posts WHERE `Description` LIKE '%" + req.params.searchKey + "%' OR `Title` LIKE '%" + req.params.searchKey + "%';")
        .then(([results, fields]) => {
            res.send(results)
        })
        .catch((err) => {
            if (err) throw err
            res.status(500).send(err)
        })

});

module.exports = router