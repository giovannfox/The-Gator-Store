const express = require('express');
const path = require('path');
const db = require('./dbConnection')
const app = express();
const search = require('./controllers/search.js');
const PORT = 3000;
var morgan = require('morgan')

db.connect()

/* General routes */
app.use(morgan("dev"))
app.use('/search', search);
app.use('/about', express.static(path.join(__dirname, "./../Frontend/About-individual-pages")));


app.listen(PORT, async () => {
    console.log("Listening now on port " + PORT);
});