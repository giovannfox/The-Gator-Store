const express = require('express');
const path = require('path');
const db = require('./dbConnection');
const app = express();
const search = require('./controllers/search.js');
var morgan = require('morgan');
var cors = require('cors');
const PORT = 3000;

db.connect()

/* General routes */
app.use(morgan("dev"))
// app.use(cors({
//     origin: "*"
// }))
app.use('/search', search);
app.use('/about', express.static(path.join(__dirname, "./../Frontend/About-individual-pages")));


app.listen(PORT, async () => {
    console.log("Listening now on port " + PORT);
});