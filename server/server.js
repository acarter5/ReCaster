const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database/operations.js');
const path = require('path');
const axios = require('axios');
const utils = require('./ServerUtils.js');
const getShoutOutIdx = utils.getShoutOutIdx;
const formatText = utils.formatText;


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

app.put('/shoutouts/wikipedia/:id', (req, mainres) => {
  var id = req.params.id;
  var title = req.body.title;
  var time = req.body.shoutoutTime;
  var url = req.body.src;
  var shoutOuts;
  var newIdx;
  var displayTitle;
  var text;
  var imgSRC;
  var newShoutOut;
  var newShoutOuts;
  var imgArr;
  var imgTitle;

  db.episodeById(id, (err, results) => {
    shoutOuts = JSON.parse(results[0].shoutouts);
    newIdx = getShoutOutIdx(shoutOuts, time);
    
    if (newIdx === -1) {
      mainres.status(409).send('given timespot already allocated')
    } else {
      axios.get('https://en.wikipedia.org/w/api.php', {
        params: {
          format: 'json',
          action: 'query',
          formatversion: 2,
          prop: 'extracts',
          redirects: 1,
          exintro: true,
          explaintext: true,
          titles: title,
        }
      })
      .then((res) => {
        displayTitle = res.data.query.pages[0].title;
        text = formatText(res.data.query.pages[0].extract);
        axios.get(`https://en.wikipedia.org/w/api.php`, {
          params: {
            format: 'json',
            action: 'query',
            pithumbsize: 100,
            formatversion: 2,
            prop: 'pageimages',
            titles: title,
          }
        })
        .then((res) => {
          imgSRC = res.data.query.pages[0].thumbnail.source;
          newShoutOut = [{"timespot": time, "img": imgSRC, "link": url, "short": text, "title": displayTitle}];
          newShoutOuts = shoutOuts.slice(0, newIdx).concat(newShoutOut).concat(shoutOuts.slice(newIdx));

          db.addShoutOut(id, JSON.stringify(newShoutOuts), (err, results) => {
            try {
              mainres.status(200).send('shoutout posted', results, err);
            } catch (err) {
              console.log('in err', err, results);
              mainres.status(404).send(err);
            }
          });
        })
        .catch((err) =>  {
          console.log('err retriving pic from wikipedia api', err);

          axios.get('https://en.wikipedia.org/w/api.php', {
            params: {
              format: 'json',
              action: 'query',
              formatversion: 2,
              prop: 'images',
              titles: title,
            }
          })
          .then((res) => {
            imgArr = res.data.query.pages[0].images;
            imgTitle = imgArr[imgArr.length - 1].title.replace('File:', '');
            
            axios.get('https://en.wikipedia.org/w/api.php', {
              params: {
                format: 'json',
                action: 'query',
                formatversion: 2,
                prop: 'imageinfo',
                iiprop: 'url',
                titles: `Image:${imgTitle}`
              }
            })
            .then((res) => {
              imgSRC = res.data.query.pages[0].imageinfo[0].url;
              newShoutOut = [{"timespot": time, "img": imgSRC, "link": url, "short": text, "title": displayTitle}];
              newShoutOuts = shoutOuts.slice(0, newIdx).concat(newShoutOut).concat(shoutOuts.slice(newIdx));

              db.addShoutOut(id, JSON.stringify(newShoutOuts), (err, results) => {
                try {
                  mainres.status(200).send('shoutout posted', results, err);
                } catch (err) {
                  console.log('in err', err, results);
                  mainres.status(404).send(err);
                }
              });
            })
            .catch((err) => console.log('err in 3rd pic retrieval', err));
          })
          .catch((err) => console.log('error in 2nd pic retrieval', err));

        });
      })
      .catch((err) => mainres.status(404).send('err retriving text from wikipedia api', err));
    }
  });
  
});


app.use('/:id',express.static(path.join(__dirname, '/../client/dist')));

app.listen(PORT, console.log('Listening on port 3000'));