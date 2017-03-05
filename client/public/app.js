/* global domElt, dropZone */

/*
 * Register for events
 */

domElt('#upload').onclick = function() {
  var request = new XMLHttpRequest();

  request.onreadystatechange = function() {
	if (request.readyState === XMLHttpRequest.DONE) {
	  if (request.status === 201) {
		let responseObj = JSON.parse(request.responseText)
		  , responseObjKeys = Object.keys(responseObj);

		for (let i=0; i<responseObjKeys.length; i++) {
		  domElt('#file_' + i + '_path').value = responseObj[i][0].path;
		}

		uploadDocument();
	  } else {
		console.log('Something went wrong when uploading the files:\n' + request.responseText);
	  }
	}
  };

  request.open('POST', '/api/files');
  request.send(dropZone.getFormData());
};

domElt('#doc-fields-clear').onclick = function() {
  Array.prototype.forEach.call(domElt('.doc-input-field'), function(el) { el.value = ''; });
  domElt('#form-files').innerHTML = '';
  dropZone.clear();
};

function uploadDocument() {
  var request = new XMLHttpRequest();

  request.onreadystatechange = function() {
	if (request.readyState === XMLHttpRequest.DONE) {
	  if (request.status === 201) {
		domElt('#upload-document-output').innerHTML = request.responseText;
		domElt('#doc-fields-clear').click();
	  } else {
		console.log('Something went wrong when uploading the files:\n' + request.responseText);
	  }
	}
  };

  request.open('POST', '/api/documents');
  request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  serializeForm(domElt('#document-form'));
  request.send(serializeForm(domElt('#document-form')));
}

/*
 * Initialize the UI
 */

dropZone.welcome();