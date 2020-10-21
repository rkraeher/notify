const express = require('express');
const path = require('path');
const fs = require('fs');
const db = require('./db/db.json');
const Note = require('./db/Note');

const app = express();
const PORT = process.env.PORT || 3003;

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 
app.use(express.static("public"));


// =============== Routes =============

app.get("/api/notes", function (req, res) {
    return res.json(db);
});

app.post("/api/notes", function (req, res) {
    const { title, text } = req.body;
    const note = new Note(title, text);
    db.push(note);
    res.json(db);
});

//!! NOT YET FUNCTIONAL
app.delete("/api/notes/:id", function (req, res) { 
    //Should receive a query parameter containing the id of a note to delete. 
    //This means you'll need to find a way to give each note a unique id when it's saved. 
    //In order to delete a note, you'll need to read all notes from the db.json file, 
    //remove the note with the given id property, 
    //and then rewrite the notes to the db.json file.

    const { id } = req.body;
    const newDb = db.filter(note => note.id != id);
    fs.writeFile(db, newDb, 'utf8', function(err){
        if (err) throw err; 
    });
    res.json(db); //unsure about this because asynchronicity
    console.log(`The newDb is ${newDb}`);
    console.log(`The db.json array looks like this: ${db}`);
    console.log(`The id of the note you want to delete is ${id}`);
});

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

// ================ Listener ===================

app.listen(PORT, () => { console.log('App listening on PORT ' + PORT)});