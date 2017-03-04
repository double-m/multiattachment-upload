'use strict';

const log4js = require('log4js');

log4js.configure('./server/log4js.json');
const logger = log4js.getLogger('document controller');

module.exports = {
  uploadAction: uploadAction
};

function uploadAction(request, response) {
  let doc = request.body;

  if (Object.keys(doc).length === 0) {
    response.status(400).send();
	logger.warn('not document to save');
    return false;
  }

  response.status(201).send(getFileObject(doc));
  logger.info('saved a new document');
}

function getFileObject(doc) {
  var docObject = { files: [] },
      keys = Object.keys(doc);

  for (let i=0; i<keys.length; i++) {
	let key = keys[i]
	  , value = doc[key];

	if (!/^file_.+$/.test(key)) {
	  docObject[key] = value;
	  continue;
	}

    let fieldIndex = key.replace(/^file_/, '').replace(/_.+$/, '')
	  , fieldName = key.replace(/^file_[0-9]+_/, '');

	if (!docObject.files[fieldIndex]) {
	  docObject.files[fieldIndex] = {};
	}
	docObject.files[fieldIndex][fieldName] = value;
  }

  return docObject;
}