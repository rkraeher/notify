const uniqid = require('uniqid');
const db = require('./db.json');
const fs = require('fs');

class Note {
    constructor(title, text){
        this.id = uniqid();
        this.title = title,
        this.text = text
    }
    saveNote(note) {
         //!! This is adding to the array but it consoles as undefined. Parse/stringify?
        db.push(note);
        console.log(db);
    }
    deleteNote(note) {
        fs.readFile(db, 'utf8', (err, note) => {
            if (err) {
                console.error(err);
                return
            }
            let arr = db.filter(note => note.id!== id);
            fs.writeFile(db, arr, 'utf8', function(err){
                if (err) {
                    console.error(err);
                    return
                }
                console.log(db);
            });
        });
    }
}

const test = new Note ("test", "This is a test note.");
console.log(test);
test.saveNote();

module.exports = Note;