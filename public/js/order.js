// Retrieve data from the local storage
let productList = JSON.parse(localStorage.getItem('currentCart'));
console.log(productList);

// Place all product lines in cart

let cartContainer = document.getElementById('cart-area');

// Create product content for each product added to the cart
productList.forEach((product) => {
    let productLine = document.createElement('div');
    let productImageArea = document.createElement('div');
    let productImageContainer=document.createElement('div');
    let productImage = document.createElement('img');
    let productDetails = document.createElement('div');
    let productText = document.createElement('div');
    let productName = document.createElement('h5');
    let productResume = document.createElement('p');
    let productColor = document.createElement('p');
    let productQuantity = document.createElement('p');


    productLine.setAttribute('class', 'row mb-4 border-bottom');
    productImageArea.setAttribute('class', 'col-md-5 col-lg-3 col-xl-3');
    productImageContainer.setAttribute('class', 'view zoom overlay z-depth-1 rounded mb-3 mb-md-0');
    productImage.setAttribute('class','img-fluid w-100');
    productDetails.setAttribute('class', 'col-md-7 col-lg-9 col-xl-9');
    productName.setAttribute('class','w-100');
    productResume.setAttribute('class', 'mb-3 text-muted text-uppercase small w-100');
    productColor.setAttribute('class', 'mb-3 text-muted text-uppercase small w-100');
    productQuantity.setAttribute('class', 'mb-3 text-muted text-uppercase small w-100');

    // Organisation of html
    productLine.appendChild(productImageArea);
    productImageArea.appendChild(productImageContainer);
    productImageContainer.appendChild(productImage);
    productLine.appendChild(productDetails);
    productDetails.appendChild(productText);
    productText.appendChild(productName);
    productText.appendChild(productResume);
    productText.appendChild(productColor);
    productText.appendChild(productQuantity);

    // Get content to display from both sources
    // From localhost cart
    productColor.innerHTML = "COULEUR: " + product.color;
    productQuantity.innerHTML = "Quantité: " + product.count;

    // Retrieve data from the backend (picture, name, description)
    function getBackendData(url) {
        var request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                var response = JSON.parse(this.responseText);
                console.log(response);
                complementaryDisplay(response);
            }
        }
        request.open("GET", url);
        request.send();
    };

    let url = "http://localhost:3000/api/teddies/" + product.id;
    console.log(url);
    getBackendData(url);

    function complementaryDisplay(response) {
        productName.innerHTML = response.name;
        productImage.setAttribute('src', response.imageUrl);
        productResume.innerHTML = response.description;
    }

    cartContainer.appendChild(productLine);
});
// Cost of all products added to the cart
let totalOrder = 0;