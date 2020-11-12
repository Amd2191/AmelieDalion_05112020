fetch("http://localhost:3000/api/teddies/")
    .then(response => {
        console.log(response);
        if (response.ok) {
            return response.json();
        } else {
            return Promise.reject(response.status);
        }
    })
    .then(data => {
        for (const element of data) {
            console.log(element);
            createTeddy(element);

        }
    });

function createTeddy(element) {
    // Creation of elements of a product card
    let productContainer = document.createElement("div");
    let productCard = document.createElement("div");
    let productImage = document.createElement("img");
    let productText = document.createElement("div");
    let productTitle = document.createElement("h5");
    let productDescription = document.createElement("p");
    let productPrice = document.createElement("p");
    let productButton = document.createElement("a");
    // Organisation of containers
    productContainer.appendChild(productCard);
    productCard.appendChild(productImage);
    productCard.appendChild(productText);
    productText.appendChild(productTitle);
    productText.appendChild(productDescription);
    productText.appendChild(productPrice);
    productText.appendChild(productButton);
    // Attribution of class in accordance with bootstrap
    productContainer.setAttribute("class", "col-12 col-lg-4");
    productCard.setAttribute("class", "card h-100");
    productImage.setAttribute("class", "card-img-top");
    productImage.setAttribute("alt", "Photo de " + element.name);
    productText.setAttribute("class", "card-body");
    productTitle.setAttribute("class", "card-title");
    productDescription.setAttribute("class", "card-text");
    productButton.setAttribute("class", "btn btn-primary stretched-link");

    // Placement
    const productList = document.getElementById("product-list");
    productList.appendChild(productContainer);


    // Contents of elements
    productImage.setAttribute("src", element.imageUrl);
    productTitle.innerHTML = element.name;
    productDescription.innerHTML = element.description;
    let price = element.price / 100;
    productPrice.innerHTML = price + " €";
    productButton.setAttribute("href", "product.html?id=" + element._id);

    // text of CTA
    productButton.innerHTML = "Découvrir " + element.name;
}




// // Creation of elements of a product card
// let productContainer = document.createElement("div");
// let productCard = document.createElement("div");
// let productImage = document.createElement("img");
// let productText = document.createElement("div");
// let productTitle = document.createElement("h5");
// let productDescription = document.createElement("p");
// let productPrice = document.createElement("p");
// let productButton = document.createElement("a");

// // Attribution of class in accordance with bootstrap
// productContainer.setAttribute("class", "col-12 col-lg-4");
// productCard.setAttribute("class", "card");
// productImage.setAttribute("class", "card-img-top");
// productImage.setAttribute("alt", "Photo de " + productTitle);
// productText.setAttribute("class", "card-body");
// productTitle.setAttribute("class", "card-title");
// productDescription.setAttribute("class", "card-text");
// productButton.setAttribute("class", "btn-primary")

// // Organisation of containers
// productCard.appendChild(productImage);
// productCard.appendChild(productText);
// productText.appendChild(productTitle);
// productText.appendChild(productDescription);
// productText.appendChild(productPrice);
// productText.appendChild(productButton);
// // Placement
// let productList = document.getElementById("product-list");
// productList.appendChild(productCard);

// // text of CTA
// productButton.innerHTML = "Découvrir " + productTitle;