var express = require('express');
var router = express.Router()
const db = require('../dbConnection');


router.get('/err', function (req, res) {
    res.send("Please enter a search key")
});

router.get('/', (req, res)=>{
    res.redirect('/test-result-page.html')
})
router.get('/results/:searchKey', function (req, res) {
    const client = db.client()
    client.query("SELECT title, description, image, instructor, course, price FROM dev.Posts WHERE `approval_flag`=1 AND (`description` LIKE '%" + req.params.searchKey + "%' OR `title` LIKE '% " + req.params.searchKey + "%') ORDER BY visits DESC limit 20;")
        .then(([results, fields]) => {
            console.log("results:", results)
            return res.json({
                ...(req.params),
                results
            })
        })
        .catch((err) => {
            if (err) throw err
            res.status(500).send(err)
        })

});

module.exports = router