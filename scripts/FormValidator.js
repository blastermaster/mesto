export default class FormValidator {
    #buttonElement = null;
    
    constructor(configSelectors, formElement) {
        this._inputSelector = configSelectors.inputSelector;
        this._submitButtonSelector = configSelectors.submitButtonSelector;
        this._inactiveButtonClass = configSelectors.inactiveButtonClass;
        this._inputErrorClass = configSelectors.inputErrorClass;
        this._errorClass = configSelectors.errorClass;
        this._formElement = formElement;
        
        this._buttonElement = formElement.querySelector(configSelectors.submitButtonSelector);
    }
    
    #setSubmitButtonActive() {
        this._buttonElement.classList.remove(this._inactiveButtonClass);
        this._buttonElement.removeAttribute('disabled');
    };
}
