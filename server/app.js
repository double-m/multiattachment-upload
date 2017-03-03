'use strict';

const express = require('express')
    , bodyParser = require('body-parser')
	, documentUploadAction = require('./controller/document').uploadAction
	, fileUploadAction = require('./controller/file').uploadAction;

let app = express();

app.use(bodyParser.json());
app.use('/', express.static('client/public'));

app.post('/api/documents', documentUploadAction);
app.post('/api/files', fileUploadAction);

module.exports = app;
