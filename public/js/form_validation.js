const form = document.getElementById('customer-form');
const firstname = document.getElementById('customer-firstname');
const lastname = document.getElementById('customer-lastname');
const email = document.getElementById('customer-email');
const address = document.getElementById('customer-address');
const zipcode = document.getElementById('customer-zipcode');
const city = document.getElementById('customer-city');

form.addEventListener('submit', e => {
    e.preventDefault();
    checkInputs();
});

function checkInputs() {
    // trim to remove the whitespaces
    const firstnameValue = firstname.value.trim();
    const lastnameValue = lastname.value.trim();
    const emailValue = email.value.trim();
    const addressValue = address.value.trim();
    const zipcodeValue = zipcode.value.trim();
    // Get the value where whitespaces are allowed
    const cityValue = city.value;

    // Test of all the imput for invalid imput or empty field
    if (firstnameValue === '') {
        setErrorFor(firstname, 'Saisie obligatoire');
    } else if (!isNotDigit(firstnameValue)) {
        setErrorFor(firstname, "Prénom erroné");
    } else {
        setSuccessFor(firstname);
    }
    if (lastnameValue === '') {
        setErrorFor(lastname, 'Saisie obligatoire');
    } else if (!isNotDigit(lastnameValue)) {
        setErrorFor(lastname, "Prénom erroné");
    } else {
        setSuccessFor(lastname);
    }
    if (emailValue === '') {
        setErrorFor(email, 'Saisie obligatoire');
    } else if (!isEmail(emailValue)) {
        setErrorFor(email, "Votre adresse mail n'est pas valide");
    } else {
        setSuccessFor(email);
    }
    if (addressValue === '') {
        setErrorFor(address, 'Saisie obligatoire');
    } else {
        setSuccessFor(address);
    }
    if (cityValue === '') {
        setErrorFor(city, 'Saisie obligatoire');
    } else {
        setSuccessFor(city);
    }
    if (zipcodeValue === '') {
        setErrorFor(zipcode, 'Saisie obligatoire');
    } else if (!isZipcode(zipcodeValue)) {
        setErrorFor(zipcode, "Code postal erroné");
    } else{
        setSuccessFor(zipcode);
    }

}

function setErrorFor(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    formControl.className = 'form-control error';
    small.innerText = message;
}

function setSuccessFor(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

function isEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

function isZipcode(zipcode) {
    return /^(?:0[1-9]|[1-9]\d)\d{3}$/.test(zipcode);
}

function isNotDigit(input) {
    return /[\D.]/.test(input);
}
