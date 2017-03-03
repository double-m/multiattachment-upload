'use strict';

const express = require('express')
	, multiparty = require('multiparty')
    , bodyParser = require('body-parser')
	, util = require('util');

let app = express();

app.use(bodyParser.json());

app.use('/', express.static('client/public'));

app.post('/api/documents', postDocumentsAction);

app.post('/api/files', postFilesAction);

module.exports = app;

// Controller Actions

function postDocumentsAction(request, response) {
  let doc = request.body;

  if (Object.keys(doc).length === 0) {
    response.status(400).send();
	console.log('not document to save');
    return false;
  }

  response.status(201).send();
  console.log('saved a new document');
}

function postFilesAction(request, response) {
  let form = new multiparty.Form();

  form.parse(request, function(err, fields, files) {
	if (!files) {
	  response.status(400).send();
	  console.log('no files to save');
	  return false;  
	}

	response.status(201).send(JSON.stringify(files));
	console.log('saved ' + Object.keys(files).length + ' files');
  });  
}