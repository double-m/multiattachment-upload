/**
 * Convenient method to abbreviate document.getElementById etc.
 *
 * @param {type} identifier
 * @returns {Element|NodeList}
 */
function domElt(identifier) {
  if (typeof identifier !== 'string') {
	return null;
  }

  if (identifier[0] === '#') {
	return document.getElementById(identifier.substring(1));
  }

  if (identifier[0] === '.') {
	return document.getElementsByClassName(identifier.substring(1));
  }

  return null;
}

/**
 * Form serializer inspired by jQuery's $(form).serialize()
 *
 * @todo manage EOL in multiline data
 * @param {type} form
 * @returns {String}
 */
function serializeForm(form) {
  //var field, l, s = [];
  var data = [];

  if (typeof form === 'object' && form.nodeName.toLowerCase() === 'form') {
	var len = form.elements.length;

	for (let i=0; i<len; i++) {
	  let field = form.elements[i];

	  if (field.name && !field.disabled && field.type !== 'file' && field.type !== 'reset' && field.type !== 'submit' && field.type !== 'button') {

		if (field.type === 'select-multiple') {
		  let l = form.elements[i].options.length;
		  for (let j = 0; j < l; j++) {
			if (field.options[j].selected)
			  data.push(field.name + '=' + field.options[j].value);
		  }
		  continue;
		}

		if ((field.type !== 'checkbox' && field.type !== 'radio') || field.checked) {
		  data.push(field.name + '=' + field.value);
		}
	  }
	}
  }

  return data.map(function(str) {
	return str.replace(' ', '+');
  }).join('&');
}
