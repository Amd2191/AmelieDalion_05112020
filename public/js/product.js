let currentURL = document.location.href;
console.log("URL actuelle: " + currentURL);
let url = new URL(currentURL);
let productId = url.searchParams.get("id");
console.log("id du produit:" + productId);

fetch("http://localhost:3000/api/teddies/" + productId)
    .then(response => {
        console.log(response);
        if (response.ok) {
            return response.json();
        } else {
            return Promise.reject(response.status);
        }
    })
    .then(data => {
        console.log(data);
        // Creation of elements of a product card
        let leftColumn = document.createElement("div");
        let productImage = document.createElement("img");
        let rightColumn = document.createElement('div');
        let productText = document.createElement("div");
        let productTitle = document.createElement("h1");
        let productDescription = document.createElement("p");
        let productPrice = document.createElement("p");
        let buyButton = document.createElement("a");
        let productConfiguration = document.createElement("select");

        buyButton.addEventListener('click',function(){
            console.log('added');
            addToCart();
        });

        // Placement
        const productContainer = document.getElementById("product-container");

        // Organisation of containers
        productContainer.appendChild(leftColumn);
        productContainer.appendChild(rightColumn);
        productText.appendChild(productTitle);
        productText.appendChild(productDescription);
        productText.appendChild(productPrice);
        productText.appendChild(productConfiguration);
        productText.appendChild(buyButton);
        rightColumn.appendChild(productText);
        leftColumn.appendChild(productImage);
        // Attribution of class in accordance with bootstrap
        leftColumn.setAttribute("class", "left-column col-6");
        productImage.setAttribute("alt", "Photo de " + data.name);
        productImage.setAttribute("class", "img-fluid")
        rightColumn.setAttribute("class", "right-column col-6");
        productConfiguration.setAttribute("class", "form-select mb-4");
        productConfiguration.setAttribute("aria-label", "Choisissez votre couleur");
        buyButton.setAttribute("class", " btn btn-primary add-to-cart");

        // Contents of elements
        productImage.setAttribute("src", data.imageUrl);
        productTitle.innerHTML = data.name;
        productDescription.innerHTML = data.description;
        let price = data.price / 100;
        productPrice.innerHTML = price + " €";
        buyButton.innerHTML = "Acheter";

        // Content of form select
        // Get the options from the backend
        let options=data.colors;
        console.log(options);
        // Loop through the array
        for (var i=0;i<options.length;i++){
            let opt=options[i];
            productConfiguration.innerHTML+="<option value="+i+">"+opt+"</option>";
        }

        // personnalisation of page title
        let pageTitle = document.getElementById("page-title");
        pageTitle.innerHTML = "Peluche " + data.name;

    });


// function addToCart(){
//     for (let i=0, i<Carts.length,i++){
//         console.log("go go");
//     }
// }

//     let carts = document.getElementsByClassName('add-to-cart');

// for (let i=0;i<carts.length;i++){
//     carts[i].addEventListener('click',()=>{
//         event.preventDefault();
//         console.log('added')
//         cartNumbers()
//     })
// }
// function cartNumbers(){
//     let numberOfProducts = localStorage.getItem('cartNumbers')
//     localStorage.setItem('cartNumbers',1);
// }