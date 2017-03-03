'use strict';

module.exports = {
  uploadAction: uploadAction
};

function uploadAction(request, response) {
  let doc = request.body;

  if (Object.keys(doc).length === 0) {
    response.status(400).send();
	console.log('not document to save');
    return false;
  }

  response.status(201).send();
  console.log('saved a new document');
}

