const express = require("express");
const path = require("path");
const fs = require("fs");
const db = require("./db/db.json");
const Note = require("./db/Note");

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
  async function postNote(req) {
    const { title, text } = req.body;
    const note = new Note(title, text);
    try {
      await db.push(note);
      await fs.writeFile("./db/db.json", JSON.stringify(db), "utf8", function (
        err
      ) {
        if (err) throw err;
      });
    } catch (err) {
      console.log(err);
    } finally {
      fs.readFile("./db/db.json", "utf8", function (err, data) {
        if (err) throw err;
        res.json(data);
      });
    }
  }
  postNote(req);
});

app.delete("/api/notes/:id", function (req, res) {
  async function deleteNote() {
    let id = req.params.id;
    try {
      await fs.readFileSync("./db/db.json", "utf8", function (err, data) {
        if (err) throw err;
        let parsed = JSON.parse(data);
        return parsed;
      });
    } catch (err) {
      console.log(err);
    } finally {
      let newDb = JSON.stringify(parsed.filter(note => note.id !== id));
      fs.writeFileSync("./db/db.json", newDb, function (err, data) {
        if (err) throw err;
        res.json(data);
      });
    }
  }
  deleteNote(req);
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
