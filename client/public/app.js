$(document).ready(function(){

  $('#doc-fields-clear').click(function(){
	$('.doc-input-field').val('');
  });

  $('#upload').click(function() {
	// TODO

	$('#doc-fields-clear').click();
	dropZone.clear();
  });

  dropZone.clear();
});

var dropZone = {
  files: [],

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
	  outMessage.push( [ 'File', i, ':', this.files[i].name, '('+this.files[i].size+')', '\n' ].join(' '));
	}
	this.output(outMessage.join(''));
  },
  output: function(message)
  {
	document.getElementById('dropZone').innerHTML = message;
  }
};
