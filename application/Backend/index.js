/**
 * The entry point for the whole app.
 * The main high level router in addition to the middleware used here.
 */

const express = require('express');
const path = require('path');
const db = require('./dbConnection');
const app = express();
const search = require('./controllers/search.js');
const post = require('./controllers/posts.js');
var morgan = require('morgan');
const PORT = 3000;

//var aws = require('aws-sdk')
//var multer = require('multer')
//var multerS3 = require('multer-s3')


db.connect();

/***MIDDLEWARE******/
app.use(morgan("dev"));

/* Main router to controllers */
app.use('/', express.static(path.join(__dirname, "./../Frontend/Vertical_Prototype/")));
app.use('/about', express.static(path.join(__dirname, "./../Frontend/About-individual-pages")));
app.use('/search', search);
app.use('/post', post);

/**
 * is this still needed?
 */
app.route('/')
    .get(function (req, res) {
        res.sendFile(path.join(__dirname, './../Frontend/Vertical_Prototype/home.html'));
    });
app.get('/about', function (req, res) {
    res.sendFile(path.join(__dirname, "./../Frontend/About-individual-pages/about.html"));
});


app.listen(PORT, async () => {
    console.log("Listening now on port " + PORT);
});



//var s3 = new aws.S3({ /* ... */ })
/*
var s3 = new aws.S3({ /* ...  })*/


/*
app.post('/upload', upload.array('photos', 3), function(req, res, next) {
    res.send('Successfully uploaded ' + req.files.length + ' files!')
})
*/