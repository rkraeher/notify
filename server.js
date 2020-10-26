const express = require("express");
const path = require("path");
const fs = require("fs");
const Note = require("./db/Note");

const app = express();
const PORT = process.env.PORT || 3003;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// =============== Routes =============

//!! Page has to be refreshed manually in the browser for post and delete to display properly on the page. 

app.get('/api/notes', function (req, res) {
  fs.readFile('./db/db.json', 'utf8', function (err, data) {
    if (err) throw err;
    res.json(JSON.parse(data));
    //res.redirect(req.get('referer'));
  });
});

app.post('/api/notes', function (req, res) {
  const { title, text } = req.body;
  const note = new Note(title, text);
  fs.readFile('./db/db.json', 'utf8', function (err, data) {
    if (err) throw err;
    let newDb = JSON.parse(data);
    newDb.push(note);
    writeNote(newDb);
  });
});

// write note function
function writeNote(data) {
  fs.writeFileSync('./db/db.json', JSON.stringify(data), function (err, data) {
    if (err) throw err;
    res.json(data);
  });
}

app.delete('/api/notes/:id', function (req, res) {
  let id = req.params.id;
  fs.readFile('./db/db.json', 'utf8', function (err, data) {
    if (err) throw err;
    let newDb = JSON.parse(data).filter((note) => note.id !== id);
    writeNote(newDb);
  });
});

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

// ================ Listener ===================

app.listen(PORT, () => {
  console.log("App listening on PORT " + PORT);
});
