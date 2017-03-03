'use strict';

const multiparty = require('multiparty');

module.exports = {
  uploadAction: uploadAction
};

function uploadAction(request, response) {
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
