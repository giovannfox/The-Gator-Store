const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    return res.send("Hello")
});

app.listen(PORT, () => {
    console.log("Listening now on port " + PORT);
});
