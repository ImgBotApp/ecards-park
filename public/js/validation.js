'use strict';

/* global validate */

// TODO:
// honeypot
// rename notice to message all over

(function () {
  // Defining form elements
  var formElements = {
    inputs: [{
      name: 'fullName',
      type: 'text',
      selector: {
        input: '.js-full-name-input',
        notice: '.js-full-name-notice'
      },
      rules: {
        presence: true,
        length: {
          minimum: 5,
          tooShort: 'Needs to have %{count} characters or more.'
        }
      },
      value: null,
      isValid: false
    }, {
      name: 'email',
      type: 'email',
      selector: {
        input: '.js-email-input',
        notice: '.js-email-notice'
      },
      rules: {
        presence: true,
        email: {
          message: 'Email address is not valid.'
        }
      },
      value: null,
      isValid: false
    }, {
      name: 'terms',
      type: 'checkbox',
      selector: {
        input: '.js-terms-input',
        notice: '.js-terms-notice'
      },
      rules: {
        presence: true,
        checkbox: {
          message: 'Please agree with terms and conditions.'
        }
      },
      isValid: false
    }],
    submit: {
      selector: {
        button: '.js-submit-button',
        notice: '.js-submit-notice'
      },
      url: ''
    }
  };

  /**
   * Handles validation for single input
   * @param {object} formElement Form element
   * @returns {void}
   */

  function handleSingleValidation(formElement) {
    var typeInput = formElement.type;
    var notice = null;

    // For text, email or password inputs
    if (typeInput === 'text' || typeInput === 'email' || typeInput === 'password') {
      notice = validate.single(formElement.value, formElement.rules);

      // For checkbox inputs
    } else if (typeInput === 'checkbox') {
      var elementCheckbox = document.querySelector(formElement.selector.input);

      // If required (presence is true) and not checked
      if (formElement.rules.presence && !elementCheckbox.checked) {
        notice = formElement.rules.checkbox.message;
      }
    }

    var elementNotice = document.querySelector(formElement.selector.notice);

    if (notice) {
      elementNotice.innerText = notice;
      elementNotice.classList.remove('is-hidden');
      formElement.isValid = false;
    } else {
      elementNotice.classList.add('is-hidden');
      formElement.isValid = true;
    }
  }

  /**
   * Handles submit
   * @returns {void}
   */

  function handleSubmit() {
    // Forcing focus, blur or change for form elements
    for (var i = 0; i < formElements.inputs.length; i += 1) {
      var selectorInput = formElements.inputs[i].selector.input;
      var elementInput = document.querySelector(selectorInput);
      var typeInput = elementInput.type;

      // For text, email or password inputs
      if (typeInput === 'text' || typeInput === 'email' || typeInput === 'password') {
        elementInput.focus();
        elementInput.blur();
      }

      // For checkbox inputs
      if (typeInput === 'checkbox') {
        // Clicking twice on checkbox to trigger click event
        // and to return it into previous state
        elementInput.click();
        elementInput.click();
      }
    }

    // Checking if all elements are valid
    var isFormValid = true;

    for (var _i = 0; _i < formElements.inputs.length; _i += 1) {
      if (!formElements.inputs[_i].isValid) {
        isFormValid = false;
        break;
      }
    }

    if (isFormValid) {
      // Showing spinner
      var selectorSpinner = formElements.submit.selector.button + ' .spinner';
      var spinner = document.querySelector(selectorSpinner);
      spinner.classList.remove('is-hidden');

      // Posting data
      // TODO: ajax call, delete simulation
      setTimeout(function () {
        // Reseting input values
        for (var _i2 = 0; _i2 < formElements.inputs.length; _i2 += 1) {
          var _selectorInput = formElements.inputs[_i2].selector.input;
          var _elementInput = document.querySelector(_selectorInput);
          var _typeInput = _elementInput.type;

          // For text, email or password inputs
          if (_typeInput === 'text' || _typeInput === 'email' || _typeInput === 'password') {
            _elementInput.value = '';
          }

          // For checkbox inputs
          if (_typeInput === 'checkbox') {
            _elementInput.checked = false;
          }
        }

        // Hidding button
        var selectorButton = formElements.submit.selector.button;
        var elementButton = document.querySelector(selectorButton);
        elementButton.classList.add('is-hidden');

        // Showing notice
        var selectorNotice = formElements.submit.selector.notice;
        var elementNotice = document.querySelector(selectorNotice);
        elementNotice.classList.remove('is-hidden');
      }, 3000);
    }
  }

  /**
   * Initialization
   * @returns {void}
   */

  function init() {
    var _loop = function _loop(i) {
      var selectorInput = formElements.inputs[i].selector.input;
      var elementInput = document.querySelector(selectorInput);
      var typeInput = elementInput.type;

      // For text, email or password inputs
      if (typeInput === 'text' || typeInput === 'email' || typeInput === 'password') {
        elementInput.addEventListener('blur', function (event) {
          formElements.inputs[i].value = event.target.value;
          handleSingleValidation(formElements.inputs[i]);
        });
      }

      // For checkbox inputs
      if (typeInput === 'checkbox') {
        elementInput.addEventListener('click', function () {
          handleSingleValidation(formElements.inputs[i]);
        });
      }
    };

    // Going through all form elements,
    // adding event listeners and handle single validation
    for (var i = 0; i < formElements.inputs.length; i += 1) {
      _loop(i);
    }

    var button = document.querySelector(formElements.submit.selector.button);
    button.addEventListener('click', handleSubmit);
  }

  // Calling init function
  init();
})();