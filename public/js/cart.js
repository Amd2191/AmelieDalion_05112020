// Retrieve data from the local storage
let productList = JSON.parse(localStorage.getItem('currentCart'));
console.log(productList);


// Place all product lines in cart

let cartContainer = document.getElementById('cart-area');

// Create product content for each product added to the cart
function cartPageDisplay(){
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
    let productPrice=document.createElement('p');


    productLine.setAttribute('class', 'row mb-4 border-bottom');
    productImageArea.setAttribute('class', 'col-md-6 col-lg-5 col-xl-5');
    productImageContainer.setAttribute('class', 'view zoom overlay z-depth-1 rounded mb-3 mb-md-0');
    productImage.setAttribute('class','img-fluid w-100');
    productDetails.setAttribute('class', 'col-md-6 col-lg-7 col-xl-7');
    productName.setAttribute('class','w-100');
    productResume.setAttribute('class', 'mb-3 text-muted text-uppercase small w-100');
    productColor.setAttribute('class', 'mb-3 text-muted text-uppercase small w-100');
    productQuantity.setAttribute('class', 'mb-3 text-muted text-uppercase small w-100');
    productPrice.setAttribute('class', 'mb-3 text-uppercase small w-100');

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
    productText.appendChild(productPrice);

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
        let price = (response.price / 100)*product.count;
        productPrice.innerHTML = price + " €";
    }

    cartContainer.appendChild(productLine);

});}
cartPageDisplay();
// Total count of products and display
let totalCount=0;
for(let i=0;i<productList.length;i++){
    totalCount=totalCount+productList[i].count;
}
let totalNumberOfItem=document.getElementById('number-of-items');

if (totalCount===0){
    totalNumberOfItem.innerHTML="Vous n'avez pas encore choisit votre compagnon";
}else{
    totalNumberOfItem.innerHTML="Vous avez "+totalCount+" ours dans votre panier";
}

// Button to empty cart
let clearButtonContainer=document.getElementById('clear-cart');
let clearButton=document.createElement('button');
clearButtonContainer.appendChild(clearButton);
clearButton.setAttribute('class','btn btn-secondary');
clearButton.setAttribute('type','button');
clearButton.innerHTML='Vider mon panier';
clearButton.addEventListener('click',function(event){
    event.preventDefault;
    localStorage.removeItem('currentCart');
    cartPageDisplay();
});

// Calculation of total order and display
let totalCart=0;
for(let i=0;i<productList.length;i++){
    totalCart=totalCart+(productList[i].price)*productList[i].count;
    console.log(totalCart);
}
let totalDisplay=document.getElementById('total-amount-order');
totalDisplay.innerHTML="Total: "+totalCart+" €";

