const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database/operations.js');
const path = require('path');

// const db = require('../database-mysql');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/episodes/:id', (req, res) => {
  db.episodeById(req.params.id, (err, results) => {
    try {
      res.status(200).send(results);
    } catch (err) {
      res.staus(404).send(err);
    }  
  });
});


app.use('/:id',express.static(path.join(__dirname, '/../client/dist')));

app.listen(PORT, console.log('Listening on port 3000'));