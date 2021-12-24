/* eslint-disable max-len */
const form = document.querySelector(".form-element");
const nameInput = document.querySelector('.name-input')
const email = document.querySelector('.email-input')
const msg = document.querySelector('.message-input');


// Show a message with a type of the input
function showMessage(input, message, type) {
    // Get the small element and set the message
    const msg1 = input.parentNode.querySelector("small");

    msg1.innerText = message;
if (type) {
    input.className = "success";
} else {
    input.className = "error";
}

return type;
}


function showError(input, message) {
    return showMessage(input, message, false);
}

function showSuccess(input) {
    return showMessage(input, "", true);
}

function hasValue(input, message) {
    if (input.value.trim() === "") {
        return showError(input, message);
    }

return showSuccess(input);
}

function validateEmail(input, requiredMsg, invalidMsg) {
    // Check if the value is not empty
    if (!hasValue(input, requiredMsg)) {
        return false;
    }
    // Validate email format
    const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-z\-0-9]+\.)+[a-z]{2,}))$/;

    const email1 = input.value.trim();

    if (!emailRegex.test(email1)) {
        return showError(input, invalidMsg);
    }

return true;
}

const NAME_REQUIRED = "Please enter your name";
const EMAIL_REQUIRED = "Please enter your email";
const EMAIL_INVALID = "Please enter a correct email address format - lowercase required";


// eslint-disable-next-line max-statements
form.addEventListener('submit', event => {
    // Stop form submission
    event.preventDefault();

    // Validate the form
    const nameValid = hasValue(form.elements.name, NAME_REQUIRED);
    const emailValid = validateEmail(form.elements.email, EMAIL_REQUIRED, EMAIL_INVALID);
    // If valid, submit the form.

    if (nameValid && emailValid) {
      form.submit();
    }

    // Local storage
    const nametext = nameInput.value.trim();
    const emailtext = email.value.trim();
    const msgtext = msg.value.trim();

    if (!nametext || !emailtext || !msgtext){
        return;
    }
    const userData = {

        "email": emailtext,
        "message": msgtext,
        "name": nametext
    }

    localStorage.setItem('data', JSON.stringify(userData));
  });

   const userInfo = JSON.parse(localStorage.getItem("data"));

if (userInfo) {
  nameInput.value = userInfo.name;
  email.value = userInfo.email;
  msg.value = userInfo.message;
}