const express = require("express");
const mysql = require("mysql")
var path = require("path");

const app = express()
const PORT = 8080;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) = {

})

app.listen(PORT, () => {
    console.log("Listening on http://localhost:" + PORT);
})