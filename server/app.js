'use strict';

const express = require('express')
    , bodyParser = require('body-parser')
    , os = require('os');

var app = express();

app.use(bodyParser.json());

app.use('/', express.static('client/public'));

app.post('/api/documents', function(request, response) {
  var doc = request.body.doc;

  if (!doc) {
    let outputMessage = 'not saved document: ' + JSON.stringify(doc) + os.EOL;

    response.status(400).send(outputMessage);
    console.log(outputMessage);

    return false;
  }

  let outputMessage = 'saved a new doc: ' + JSON.stringify(doc) + os.EOL;

  response.status(201).send(outputMessage);
  console.log(outputMessage);
});

app.post('/api/files', function(request, response) {
  var file = request.body.file;

  let outputMessage = 'called /api/files via POST' + os.EOL;

  response.status(201).send(outputMessage);
  console.log(outputMessage);
});

module.exports = app;
