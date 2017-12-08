/* global validate */

// TODO captcha or some other mechanisem

(function () {
  // Defining form elements
  const formElements = [{
    name: 'fullName',
    selector: {
      input: '.js-input-full-name',
      notice: '.js-notice-full-name',
    },
    rules: {
      presence: true, email: true,
    },
    value: null,
    isValid: false,
  }, {
    name: 'email',
    selector: {
      input: '.js-input-email',
      notice: '.js-notice-email',
    },
    rules: {
      presence: true, email: true,
    },
    value: null,
    isValid: false,
  }];

  /**
   * Handles validation for single input
   * @param {object} formElement Form element
   * @returns {void}
   */

  function handleSingleValidation(formElement) {
    const notice = validate.single(formElement.value, formElement.rules);
    const elementNotice = document.querySelector(formElement.selector.notice);

    if (notice) {
      elementNotice.innerText = notice;
      elementNotice.classList.remove('is-hidden');
      elementNotice.classList.add('is-visible');
      formElement.isValid = false;
    } else {
      elementNotice.classList.remove('is-visible');
      elementNotice.classList.add('is-hidden');
      formElement.isValid = true;
    }
  }

  /**
   * Handles submit
   * @param {???} ??? ???
   * @returns {void}
   */

  function handleSubmit() {
    console.log('submititng');

    // Forcing focus and blur on all form elements
    for (let i = 0; i < formElements.length; i += 1) {
      const elementInput = document.querySelector(formElements[i].selector.input);
      elementInput.focus();
      elementInput.blur();
    }

    // Checking if all elements are valid
    let isFormValid = false;

    // TODO: logic fails here
    for (let i = 0; i < formElements.length; i += 1) {
      console.log(formElements[i].isValid);

      if (!formElements[i].isValid) {
        break;
      }

      isFormValid = true;
    }

    console.log('is form valid', isFormValid);

    // loop through all elements and check if valid
    // if valid - post data, show notice, clean all elements
    // if not, do nothing
  }

  /**
   * Initialization
   * @returns {void}
   */

  function init() {
    // Going through all form elements,
    // adding event listeners and handle single validation
    for (let i = 0; i < formElements.length; i += 1) {
      const elementInput = document.querySelector(formElements[i].selector.input);

      elementInput.addEventListener('blur', (event) => {
        formElements[i].value = event.target.value;
        handleSingleValidation(formElements[i]);
      });
    }

    const button = document.querySelector('.js-submit');
    button.addEventListener('click', handleSubmit);
  }

  // Calling init function
  init();
}());
