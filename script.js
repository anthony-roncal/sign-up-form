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

const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

formFirstName.addEventListener('input', isFieldEmpty);
formLastName.addEventListener('input', isFieldEmpty);
formEmail.addEventListener('input', isFieldEmpty);
formPhone.addEventListener('input', isFieldEmpty);
formCountry.addEventListener('input', isFieldEmpty);
formZip.addEventListener('input', isFieldEmpty);
formPassword.addEventListener('input', isFieldEmpty);
formPassword2.addEventListener('input', isFieldEmpty);

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
    if(phoneNumber.length < 10) {
        formPhone.className = 'invalid';
        errorPhone.textContent = 'Please enter a valid 10-digit phone number';
    }
});

// formPassword.addEventListener('input', comparePasswords);
// formPassword2.addEventListener('input', comparePasswords);

// function comparePasswords(e) {
//     if (formPassword.value !== formPassword2.value) {
//         console.log(`formPassword.value = ${formPassword.value}`);
//         console.log(`formPassword2.value = ${formPassword2.value}`);
//         formPassword.className('invalid');
//         formPassword2.className('invalid');
//     } else if (formPassword.value === formPassword2.value) {
//         console.log(`formPassword.value = ${formPassword.value}`);
//         console.log(`formPassword2.value = ${formPassword2.value}`);
//         formPassword.className('valid');
//         formPassword2.className('valid');
//     }
// }

form.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('submit');
});