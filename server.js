const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3003;

const notes = []; // These notes need to go to the db.json file.

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 



app.listen(PORT, function () {
    console.log('App listening on PORT ' + PORT);
  });