/* global globalVariable(s) */

(function () {
  console.log('>>> loading validation');

  const formElements = [{
    name: 'fullName',
    selector: '.js-full-name',
    type: 'text',
    isValid: false
  }, {
    name: 'email',
    selector: '.js-email',
    type: 'email',
    isValid: false
  }];

  for (let i = 0; i < formElements.length; i += 1) {
    let element = document.querySelector(formElements[i].selector);

    element.addEventListener('blur', event => {
      validate(formElements[i].type, event.target.value);
    });
  }

  function validate(type, value) {
    console.log('>>> validating', type, value);
  }
}());
