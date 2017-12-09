/* global validate */

// TODO:
// honeypot
// rename notice to message all over

(function () {
  // Defining form elements
  const formElements = {
    inputs: [{
      name: 'fullName',
      type: 'text',
      selector: {
        input: '.js-full-name-input',
        notice: '.js-full-name-notice',
      },
      rules: {
        presence: true,
        length: {
          minimum: 5,
          tooShort: 'Needs to have %{count} characters or more.',
        },
      },
      value: null,
      isValid: false,
    }, {
      name: 'email',
      type: 'email',
      selector: {
        input: '.js-email-input',
        notice: '.js-email-notice',
      },
      rules: {
        presence: true,
        email: {
          message: 'Email address is not valid.',
        },
      },
      value: null,
      isValid: false,
    }, {
      name: 'terms',
      type: 'checkbox',
      selector: {
        input: '.js-terms-input',
        notice: '.js-terms-notice',
      },
      rules: {
        presence: true,
        checkbox: {
          message: 'Please agree with terms and conditions.',
        },
      },
      isValid: false,
    }],
    submit: {
      selector: {
        button: '.js-submit-button',
        notice: '.js-submit-notice',
      },
      url: '',
    },
  };

  /**
   * Handles validation for single input
   * @param {object} formElement Form element
   * @returns {void}
   */

  function handleSingleValidation(formElement) {
    const typeInput = formElement.type;
    let notice = null;

    // For text, email or password inputs
    if (typeInput === 'text' || typeInput === 'email' || typeInput === 'password') {
      notice = validate.single(formElement.value, formElement.rules);

    // For checkbox inputs
    } else if (typeInput === 'checkbox') {
      const elementCheckbox = document.querySelector(formElement.selector.input);

      // If required (presence is true) and not checked
      if (formElement.rules.presence && !elementCheckbox.checked) {
        notice = formElement.rules.checkbox.message;
      }
    }

    const elementNotice = document.querySelector(formElement.selector.notice);

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
    for (let i = 0; i < formElements.inputs.length; i += 1) {
      const selectorInput = formElements.inputs[i].selector.input;
      const elementInput = document.querySelector(selectorInput);
      const typeInput = elementInput.type;

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
    let isFormValid = true;

    for (let i = 0; i < formElements.inputs.length; i += 1) {
      if (!formElements.inputs[i].isValid) {
        isFormValid = false;
        break;
      }
    }

    if (isFormValid) {
      // Showing spinner
      const selectorSpinner = `${formElements.submit.selector.button} .spinner`;
      const spinner = document.querySelector(selectorSpinner);
      spinner.classList.remove('is-hidden');

      // Posting data
      // TODO: ajax call, delete simulation
      setTimeout(() => {
        // Reseting input values
        for (let i = 0; i < formElements.inputs.length; i += 1) {
          const selectorInput = formElements.inputs[i].selector.input;
          const elementInput = document.querySelector(selectorInput);
          const typeInput = elementInput.type;

          // For text, email or password inputs
          if (typeInput === 'text' || typeInput === 'email' || typeInput === 'password') {
            elementInput.value = '';
          }

          // For checkbox inputs
          if (typeInput === 'checkbox') {
            elementInput.checked = false;
          }
        }

        // Hidding button
        const selectorButton = formElements.submit.selector.button;
        const elementButton = document.querySelector(selectorButton);
        elementButton.classList.add('is-hidden');

        // Showing notice
        const selectorNotice = formElements.submit.selector.notice;
        const elementNotice = document.querySelector(selectorNotice);
        elementNotice.classList.remove('is-hidden');
      }, 3000);
    }
  }

  /**
   * Initialization
   * @returns {void}
   */

  function init() {
    // Going through all form elements,
    // adding event listeners and handle single validation
    for (let i = 0; i < formElements.inputs.length; i += 1) {
      const selectorInput = formElements.inputs[i].selector.input;
      const elementInput = document.querySelector(selectorInput);
      const typeInput = elementInput.type;

      // For text, email or password inputs
      if (typeInput === 'text' || typeInput === 'email' || typeInput === 'password') {
        elementInput.addEventListener('blur', (event) => {
          formElements.inputs[i].value = event.target.value;
          handleSingleValidation(formElements.inputs[i]);
        });
      }

      // For checkbox inputs
      if (typeInput === 'checkbox') {
        elementInput.addEventListener('click', () => {
          handleSingleValidation(formElements.inputs[i]);
        });
      }
    }

    const button = document.querySelector(formElements.submit.selector.button);
    button.addEventListener('click', handleSubmit);
  }

  // Calling init function
  init();
}());
