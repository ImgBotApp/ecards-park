/* global globalVariable(s) */

(function () {
  console.log('>>> loading validation');

  var formElements = [{
    name: 'fullName',
    selector: '.js-full-name',
    type: 'string',
    isValid: false
  }, {
    name: 'email',
    selector: '.js-email',
    type: 'email',
    isValid: false
  }];

  for (var i = 0; i < formElements.length; i += 1) {
    var element = document.querySelector(formElements[i].selector);

    element.addEventListener('blur', function(event) {
      validate('type', event.target.value);
    });
  }

  function validate(type, value) {
    console.log('>>> validating', type, value);
  }
}());
