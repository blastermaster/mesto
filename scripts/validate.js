const showInputError = (inputElement, errorMessage, config) => {
    const formSectionElement = inputElement.closest(".form__section");
    const errorElement = formSectionElement.querySelector(config.inputErrorClass);

    errorElement.textContent = errorMessage;
    errorElement.classList.add(config.errorClass);
};

const hideInputError = (inputElement, config) => {
    const formSectionElement = inputElement.closest(".form__section");
    const errorElement = formSectionElement.querySelector(config.inputErrorClass);

    errorElement.textContent = "";
    errorElement.classList.remove(config.errorClass);
};


const checkInputValidity = (formElement, inputElement, config) => {
    const isInputNotValid = !inputElement.validity.valid;

    if (isInputNotValid) {
        const errorMessage = inputElement.validationMessage;

        showInputError(inputElement, errorMessage, config);
    } else {
        hideInputError(inputElement, config);
    }
};

const toggleButtonState = (inputList, buttonElement, config) => {
    const findAtLeastOneInvalid = (inputElement) => !inputElement.validity.valid;
    const hasNotValidInput = inputList.some(findAtLeastOneInvalid);

    if (hasNotValidInput) {
        buttonElement.setAttribute("disabled", true);
        buttonElement.classList.add(config.inactiveButtonClass);
    } else {
        buttonElement.removeAttribute("disabled");
        buttonElement.classList.remove(config.inactiveButtonClass);
    }
};


const setEventListeners = (formElement, config) => {
    const handleFormSubmit = (event) => {
        event.preventDefault();
    };
    formElement.addEventListener("submit", handleFormSubmit);

    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonElement = formElement.querySelector(config.submitButtonSelector);


    const inputListIterator = (inputElement) => {
        const handleInput = () => {
            checkInputValidity(formElement, inputElement, config);
            toggleButtonState(inputList, buttonElement, config);
        };

        inputElement.addEventListener("input", handleInput);
    }


    inputList.forEach(inputListIterator);

    toggleButtonState(inputList, buttonElement, config);
};


const enableValidation = (config) => {
    const formElements = document.querySelectorAll(config.formSelector);
    const formList = Array.from(formElements);

    formList.forEach((formElements) => {
        setEventListeners(formElements, config)
    });
};

const config = {
    formSelector: ".change-form",
    inputSelector: ".change-form__input",
    submitButtonSelector: ".change-form__submit-btn",
    inactiveButtonClass: "change-form__submit-btn_inactive",
    inputErrorClass: ".change-form__input-error",
    errorClass: 'change-form__input-error_active'
}

enableValidation(config);
