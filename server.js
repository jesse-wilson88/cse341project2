const express = require("express");
const bodyParser = require("body-parser");
const mongodb = require("./db/connect");

const port = process.env.PORT || 3000;
const app = express();

app.get("/", (req, res) => {
    res.send("Hello World!");
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})

// Continue watching the solution video from 13 minutes