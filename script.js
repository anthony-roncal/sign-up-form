const form = document.getElementById('form');
const formFirstName = document.getElementById('first-name');
const errorFirstName = formFirstName.nextElementSibling;
const formLastName = document.getElementById('last-name');
const errorLastName = formLastName.nextElementSibling;
const formEmail = document.getElementById('email');
const errorEmail = formEmail.nextElementSibling;
const formPhone = document.getElementById('phone');
const errorPhone = formPhone.nextElementSibling;
const formCountry = document.getElementById('country');
const errorCountry = formCountry.nextElementSibling;
const formZip = document.getElementById('zip');
const errorZip = formZip.nextElementSibling;
const formPassword = document.getElementById('password');
const errorPassword = formPassword.nextElementSibling;
const formPassword2 = document.getElementById('password2');
const errorPassword2 = formPassword2.nextElementSibling;
const formSubmitBtn = form.querySelector('form > button');
const errorSubmitBtn = formSubmitBtn.nextElementSibling;

const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

const countryRegex = [
    {country: "US", regex: /^\d{5}([\-]?\d{4})?$/},
    {country: "UK", regex: /^(GIR|[A-Z]\d[A-Z\d]??|[A-Z]{2}\d[A-Z\d]??)[ ]??(\d[A-Z]{2})$/},
    {country: "DE", regex: /^\d{5}$/},
    {country: "CA", regex: /^([ABCEGHJKLMNPRSTVXY]\d[ABCEGHJKLMNPRSTVWXYZ])\ {0,1}(\d[ABCEGHJKLMNPRSTVWXYZ]\d)$/},
    {country: "FR", regex: /^(F-)?((2[A|B])|[0-9]{2})[0-9]{3}$/},
    {country: "IT", regex: /^(V-|I-)?[0-9]{5}$/},
    {country: "AU", regex: /^(0[289][0-9]{2})|([1345689][0-9]{3})|(2[0-8][0-9]{2})|(290[0-9])|(291[0-4])|(7[0-4][0-9]{2})|(7[8-9][0-9]{2})$/},
    {country: "NL", regex: /^[1-9][0-9]{3}\s?([a-zA-Z]{2})?$/},
    {country: "ES", regex: /^([1-9]{2}|[0-9][1-9]|[1-9][0-9])[0-9]{3}$/},
    {country: "DK", regex: /^([D|d][K|k]( |-))?[1-9]{1}[0-9]{3}$/},
    {country: "SE", regex: /^(s-|S-){0,1}[0-9]{3}\s?[0-9]{2}$/},
    {country: "BE", regex: /^[1-9]{1}[0-9]{3}$/},
    {country: "IN", regex: /^\d{6}$/}
];

document.querySelectorAll('.form-item > input').forEach(input => input.addEventListener('input', isFieldEmpty));

function isFieldEmpty(e) {
    if(e.target.value.length === 0) {
        e.target.className = 'invalid';
        e.target.nextElementSibling.textContent = `${e.target.dataset.name} is required`;
    } else {
        e.target.className = 'valid';
        e.target.nextElementSibling.textContent = '';
    }
}

formEmail.addEventListener('input', () => {
    if(formEmail.value.length > 0 && !emailRegex.test(formEmail.value)) {
        formEmail.className = 'invalid';
        errorEmail.textContent = 'Please enter a valid email';
    }
});

formPhone.addEventListener('input', (e) => {
    var phoneNumber = formPhone.value.replace(/[^\d]/g, '');
    formPhone.value = phoneNumber;
    if(phoneNumber.length < 4) formPhone.value = phoneNumber;
    if(phoneNumber.length >= 4 && phoneNumber.length < 7) {
        formPhone.value = `(${phoneNumber.slice(0,3)}) ${phoneNumber.slice(3)}`;
    }
    if(phoneNumber.length >= 7) {
        formPhone.value = `(${phoneNumber.slice(0,3)}) ${phoneNumber.slice(3,6)}-${phoneNumber.slice(6,10)}`;
    }
    if(phoneNumber.length > 0 && phoneNumber.length < 10) {
        formPhone.className = 'invalid';
        errorPhone.textContent = 'Please enter a valid 10-digit phone number';
    }
});

countryRegex.forEach(item => {
    var option = document.createElement('option');
    option.value = item.country;
    option.textContent = item.country;
    formCountry.appendChild(option);
});

formCountry.addEventListener('change', () => formZip.value = '');

formZip.addEventListener('input', () => {
    var zipRegex = countryRegex.find(item => item.country === formCountry.value).regex;
    if(formZip.value.length > 0 && !zipRegex.test(formZip.value)) {
        formZip.className = 'invalid';
        errorZip.textContent = 'Please enter a valid zip code';
    }
});

formPassword.addEventListener('input', comparePasswords);
formPassword2.addEventListener('input', comparePasswords);

function comparePasswords(e) {
    if(formPassword.value.length > 0 && formPassword2.value.length > 0) {
        if(formPassword.value !== formPassword2.value) {
            formPassword.className = 'invalid';
            formPassword2.className = 'invalid';
            errorPassword2.textContent = 'Passwords do not match';
        } else if (formPassword.value === formPassword2.value) {
            formPassword.className = 'valid';
            formPassword2.className = 'valid';
            errorPassword2.textContent = '';
        }
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    let errorMessage = 'Please check the following fields: ';
    let invalidFields = [];
    document.querySelectorAll('.form-item > input').forEach(input => {
        if(!input.className) {
            input.className = 'invalid';
        }
        if(input.className === 'invalid') {
            invalidFields.push(input.dataset.name);
        }
    });
    if(invalidFields.length === 0) {
        errorSubmitBtn.textContent = '';
        form.reset();
        console.log('successful');
    } else {
        errorMessage += invalidFields.join(', ');
        errorSubmitBtn.textContent = errorMessage;
    }
});

