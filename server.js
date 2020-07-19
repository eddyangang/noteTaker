const express = require("express");
const fs = require("fs")
var path = require("path");
const { v4: uuidv4 } = require('uuid');

const app = express()
const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname))

app.get("/api/notes", (req, res) => {
    
    fs.readFile(path.join(__dirname + "/db/db.json"), (err, data) => {

        const allNotes =JSON.parse(data);
        if (err) throw err;
        res.json(allNotes);
    })
})

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname + "/public", "/notes.html"))
})

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/public", "/index.html"))
})


app.post("/api/notes", (req, res) => {

    let notes = fs.readFileSync(path.join(__dirname + "/db/db.json"));

    notes = JSON.parse(notes);

    notes.push({...req.body, id: uuidv4()})

    fs.writeFileSync(path.join(__dirname + "/db/db.json"), JSON.stringify(notes))

    res.json(req.body)
})

app.delete("/api/notes/:id", (req, res) => {

    let notes = fs.readFileSync(path.join(__dirname + "/db/db.json"));

    notes = JSON.parse(notes);
    
    let id = req.params.id

    const deleteNote = notes.findIndex( (note) =>  note.id = id)

    notes.splice(deleteNote, 1)

    fs.writeFileSync(path.join(__dirname + "/db/db.json"), JSON.stringify(notes))
    
    res.json(notes)
})

app.listen(PORT, () => {
    console.log("Listening on http://localhost:" + PORT);
})

