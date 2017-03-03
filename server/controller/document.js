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

  response.status(201).send();
  logger.info('saved a new document');
}

