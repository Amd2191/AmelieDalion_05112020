const form = document.getElementById('customer-form');
const firstname = document.getElementById('customer-firstname');
const lastname = document.getElementById('customer-lastname');
const email = document.getElementById('customer-email');
const address = document.getElementById('customer-address');
const zipcode = document.getElementById('customer-zipcode');
const city = document.getElementById('customer-city');

function postOrder(data) {
    fetch("http://localhost:3000/api/teddies/order",{
    method:'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    mode:'cors',
    body: data
    })
    .then(response=>{
        console.log(response);
        return response.json();
    })
    .then ( storeOrder => {

        let clientInformation=JSON.stringify(storeOrder.contact);
        let orderId=JSON.stringify(storeOrder.orderId);
        console.log(storeOrder.contact);
        console.log(storeOrder.orderId);
        let totalOrder=JSON.stringify(totalCart);
        let orderDetails=[clientInformation,orderId,totalOrder];
        console.log(orderDetails);
        localStorage.clear('currentCart');
        localStorage.clear('orderInformation');
        localStorage.setItem('orderInformation',orderDetails)

    })
    
    
    
    // (function storeOrder(){
        // let clientInformation=JSON.stringify(storeOrder.contact);
       //  let orderId=JSON.stringify(storeOrder.orderId);
       //  console.log(storeOrder.contact);
        // console.log(storeOrder.orderId);
       //  let totalOrder=JSON.stringify(totalCart);
        // let orderDetails=[clientInformation,orderId,totalOrder]
        // console.log(orderDetails);
        // localStorage.clear('currentCart');
        // localStorage.setItem('orderInformation',orderDetails)
   //  })
    .catch((e) => {
        console.log(e);
    })
}


// Submit form with check and sent to the backend
form.addEventListener('submit', e => {
    e.preventDefault();
    if (checkInputs()) {
        let idArray = [];
        productList.forEach((product) => {
            idArray.push(product.id);
        });
        var order = {
            contact: {
                firstName: firstname.value,
                lastName: lastname.value,
                address: address.value,
                city: city.value,
                email: email.value
            },
            products: idArray
        };
        console.log(JSON.stringify(order));
        postOrder(JSON.stringify(order));
    }
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

    let validation = true;

    // Test of all the imput for invalid imput or empty field
    if (!isNotDigit(firstnameValue)) {
        setErrorFor(firstname, "Prénom erroné");
        validation = false;
    } else {
        setSuccessFor(firstname);
    }

    if (!isNotDigit(lastnameValue)) {
        setErrorFor(lastname, "Nom erroné");
        validation = false;
    } else {
        setSuccessFor(lastname);
    }

    if (!isEmail(emailValue)) {
        setErrorFor(email, "Votre adresse mail n'est pas valide");
        validation = false;
    } else {
        setSuccessFor(email);
    }

    if (!isZipcode(zipcodeValue)) {
        setErrorFor(zipcode, "Code postal erroné");
        validation = false;
    } else {
        setSuccessFor(zipcode);
    }

    setSuccessFor(city);
    setSuccessFor(address);

    document.querySelectorAll('input').forEach(input => {
        if (!input.value.length) {
            setErrorFor(input, 'Saisie obligatoire')
        }
    })
    if (validation)
        return true
    return false
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
    return /^([a-zA-ZàáâäæçéèêëîïôœùûüÿÀÂÄÆÇÉÈÊËÎÏÔŒÙÛÜŸ \-\']+)$/.test(input);
}