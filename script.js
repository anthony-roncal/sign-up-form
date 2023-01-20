const form = document.getElementById("form");
const passwordField = document.getElementById("password");
const password2Field = document.getElementById("password2");
const errorMessage = document.querySelector("span.error");

passwordField.addEventListener('input', comparePasswords);
password2Field.addEventListener('input', comparePasswords);
form.addEventListener('submit', comparePasswords);

function comparePasswords(e) {
    if (passwordField.value !== password2Field.value) {
        console.log(`passwordField.value = ${passwordField.value}`);
        console.log(`password2Field.value = ${password2Field.value}`);
        passwordField.classList.add('error');
        password2Field.classList.add('error');
        errorMessage.textContent = "Passwords do not match";
    } else if (passwordField.value === password2Field.value) {
        console.log(`passwordField.value = ${passwordField.value}`);
        console.log(`password2Field.value = ${password2Field.value}`);
        passwordField.classList.remove('error');
        password2Field.classList.remove('error');
        errorMessage.textContent = "";
    }
}