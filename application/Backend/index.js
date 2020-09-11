const express = require('express');
const app = express();
const aboutMeRouter = require('./controllers/aboutMePage.js');
const PORT = 3000;


/* General routes */
app.get('/about', aboutMeRouter);



app.listen(PORT, () => {
    console.log("Listening now on port " + PORT);
});
