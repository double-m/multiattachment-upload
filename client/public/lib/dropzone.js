/* global domElt */

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
	this.files = [];
	this.welcome();
  },

  welcome: function() {
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
	var fileFields = [];

	for (var i = 0; i < this.files.length; i++) {
	  fileFields.push('<input type="hidden" name="file_' + i + '_filename" value="' + this.files[i].name + '"/>\n' +
	    '<input type="hidden" id="file_' + i + '_path" name="file_' + i + '_path" value=""/>\n' +
		'Filename: ' + this.files[i].name + ' (size: '+this.files[i].size+') ' +
		' - <label for="file_' + i + '_customfield_name">Custom field: </abel><input type="text" id="file_' + i + '_customfield_name" name="file_' + i + '_customfield_name" />');
	}

	domElt('#form-files').innerHTML = '<div>' + fileFields.join('</div><div>') + '</div>';
  },

  output: function(message) {
	domElt('#dropZone').innerHTML = message;
  }
};
