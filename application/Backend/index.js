const express = require('express');
const path = require('path');
const app = express();
const aboutMeRouter = require('./controllers/aboutMePage.js');
const PORT = 3000;


/* General routes */
// app.get('/about', aboutMeRouter);
app.use('/about', express.static(path.join(__dirname, "./../Frontend/About-individual-pages")));

app.listen(PORT, () => {
    console.log("Listening now on port " + PORT);
});
