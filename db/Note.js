const uniqid = require('uniqid');

class Note {
    constructor(title, text){
        this.id = uniqid();
        this.title = title,
        this.text = text
    }
}

module.exports = Note;