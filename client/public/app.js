$(document).ready(function(){

  $('#doc-fields-clear').click(function(){
	$('.doc-input-field').val('');
	$('#form-files').html('');
  });

  $('#upload').click(function () {
	var request = new XMLHttpRequest();
	request.open('POST', '/api/files');
	request.onreadystatechange = function() {
	  if (request.readyState === XMLHttpRequest.DONE) {
		if (request.status === 201) {
		  let responseObj = JSON.parse(request.responseText)
		    , responseObjKeys = Object.keys(responseObj);

		  for (let i=0; i<responseObjKeys.length; i++) {
			document.getElementById('file_' + i + '_path').value = responseObj[i][0].path;
		  }

		  uploadDocument();
		} else {
		  console.log('Something went wrong when uploading the files:\n' + request.responseText);
		}
	  }
	};
	request.send(dropZone.getFormData());
  });

  $('#document-form').submit(function(event) {
	console.log('sdfgy');
	event.preventDefault();
  });

  dropZone.clear();
});

function uploadDocument() {
  $.ajax({
	type: 'POST',
	url: '/api/documents',
	data: $('#document-form').serialize(),
	dataType: 'json',
	processData: false,
	success: function(data, textStatus, jqXHR){
	  if (typeof data.error !== 'undefined') {
		console.log('ERRORS: ' + data.error);
	  }

	  $('#upload-document-output').html(JSON.stringify(data));
	  $('#doc-fields-clear').click();
	  dropZone.clear();
	},
	error: function (jqXHR, textStatus, errorThrown) {
	  console.log('ERRORS: ' + textStatus);
	}
  });
}

var dropZone = {
  files: [],

  getFormData: function() {
	var formData = new FormData();

	for (var i = 0; i < this.files.length; i++) {
	  formData.append(i, this.files[i]);
	}

    return formData;
  },

  clear: function() {
	this.files = [],
	this.output('<div class="dz-starting-message">DROP YOUR FILES HERE</div>');
  },

  onDragEnter: function(event) {
	event.stopPropagation();
	event.preventDefault();
  },

  onDragOver: function(event) {
	event.stopPropagation();
	event.preventDefault();
  },

  onDrop: function(event) {
	event.stopPropagation();
	event.preventDefault();
	this.manageDropped(event);
	this.addFileFileds();
  },

  manageDropped: function(event) {
	var dt = event.dataTransfer
	  , droppedFiles = dt.files;

	for (var i = 0; i < droppedFiles.length; i++) {
	  this.files.push(droppedFiles[i]);
	}

	this.output('File Count: ' + this.files.length + '\n');

	var outMessage = [];
	for (var i = 0; i < this.files.length; i++) {
	  outMessage.push( [ 'File', i, ':', this.files[i].name, '('+this.files[i].size+')' ].join(' '));
	}
	this.output(outMessage.join('\n'));
  },

  addFileFileds: function(event) {
	var fileFields = $('<div>');

	for (var i = 0; i < this.files.length; i++) {
	  console.log(this.files[i]);
	  fileFields.append($('<div>').html(
	    '<input type="hidden" name="file_' + i + '_filename" value="' + this.files[i].name + '"/>\n' +
	    '<input type="hidden" id="file_' + i + '_path" name="file_' + i + '_path" value=""/>\n' +
		'Filename: ' + this.files[i].name + ' (size: '+this.files[i].size+') ' +
		' - <label for="file_' + i + '_customfield_name">Custom field: </abel><input type="text" id="file_' + i + '_customfield_name" name="file_' + i + '_customfield_name" />'
	  ));
	}

	$('#form-files').html(fileFields);
  },

  output: function(message)
  {
	$('#dropZone').html(message);
  }
};
