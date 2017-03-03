'use strict';

const multiparty = require('multiparty')
    , log4js = require('log4js');

log4js.configure('./server/log4js.json');
const logger = log4js.getLogger('file controller');

module.exports = {
  uploadAction: uploadAction
};

function uploadAction(request, response) {
  let form = new multiparty.Form();

  form.parse(request, function(err, fields, files) {
	if (!files) {
	  response.status(400).send();
	  logger.warn('no files to save');
	  return false;  
	}

	response.status(201).send(JSON.stringify(files));
	logger.info('saved ' + Object.keys(files).length + ' files');
  });  
}
