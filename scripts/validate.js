const showInputError = (inputElement, errorMessage) => {
    const formSectionElement = inputElement.closest(".form__section");
    const errorElement = formSectionElement.querySelector(".change-form__input-error");

    errorElement.textContent = errorMessage;
    errorElement.classList.add("change-form__input-error_active")
};

const hideInputError = (inputElement) => {
    const formSectionElement = inputElement.closest(".form__section");
    const errorElement = formSectionElement.querySelector(".change-form__input-error");

    errorElement.textContent = "";
    errorElement.classList.remove("change-form__input-error_active")
};


const checkInputValidity = (formElement, inputElement) => {
    const isInputNotValid = !inputElement.validity.valid;

    if (isInputNotValid) {
        const errorMessage = inputElement.validationMessage;

        showInputError(inputElement, errorMessage);
    } else {
        hideInputError(inputElement);
    }
};

const toggleButtonState = (inputList, buttonElement) => {
    const findAtLeastOneInvalid = (inputElement) => !inputElement.validity.valid;
    const hasNotValidInput = inputList.some(findAtLeastOneInvalid);

    if (hasNotValidInput) {
        buttonElement.setAttribute("disabled", true);
        buttonElement.classList.add("change-form__submit-btn_inactive");
    } else {
        buttonElement.removeAttribute("disabled");
        buttonElement.classList.remove("change-form__submit-btn_inactive");
    }
};


const setEventListeners = (formElement, inputSelector) => {
    const handleFormSubmit = (event) => {
        event.preventDefault();
    };
    formElement.addEventListener("submit", handleFormSubmit);

    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(".change-form__submit-btn");


    const inputListIterator = (inputElement) => {
        const handleInput = () => {
            checkInputValidity(formElement, inputElement);
            toggleButtonState(inputList, buttonElement);
        };

        inputElement.addEventListener("input", handleInput);
    }


    inputList.forEach(inputListIterator);

    toggleButtonState(inputList, buttonElement);
};


const enableValidation = ({ formSelector, inputSelector, submitButtonSelector, inactiveButtonClass }) => {
    const formElements = document.querySelectorAll(formSelector);
    const formList = Array.from(formElements);

    formList.forEach((formElements) => {
        setEventListeners(formElements, inputSelector, submitButtonSelector, inactiveButtonClass)
    });
};

enableValidation({
    formSelector: ".change-form",
    inputSelector: ".change-form__input",
    submitButtonSelector: ".change-form__submit-btn",
    inactiveButtonClass: "change-form__submit-btn",
});