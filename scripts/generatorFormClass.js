'use strict';

// FORM SUPER CLASS

function Form(form){
    this.formDocumentObject = form,
    form.addEventListener('click', this.onClick.bind(this));
}

Object.setPrototypeOf(form, {
    constructor: form,
    onClick(event) {
        let action = event.target.dataset.action;
        if(action){
            this[action]();
        }
    }
});

console.log(


// TEXT FONT SETTINGS FORM 
// Inherits from the SUPER CLASS form

function TextStyleFont(form){
    Form.call(this, form);
}

Form.prototype

