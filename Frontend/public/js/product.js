let currentURL = document.location.href;
console.log("URL actuelle: " + currentURL);
let url = new URL(currentURL);
let productId = url.searchParams.get("id");
console.log("id du produit:" + productId);

// Retrieve data from the local storage
let productList = JSON.parse(localStorage.getItem('currentCart'));

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
        let productConfiguration = document.createElement("select");
        let buyButton = document.createElement("a");

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
        productConfiguration.setAttribute("class", "form-select mb-4 selectpicker");
        productConfiguration.setAttribute("aria-label", "Choisissez votre couleur");
        productConfiguration.setAttribute("id", "color");
        buyButton.setAttribute("class", " btn btn-primary add-to-cart");
        buyButton.setAttribute("id", "buy-button");

        // Contents of elements
        productImage.setAttribute("src", data.imageUrl);
        productTitle.innerHTML = data.name;
        productDescription.innerHTML = data.description;
        let price = data.price / 100;
        productPrice.innerHTML = price + " €";
        buyButton.innerHTML = "Acheter";

        // Content of form select
        // Get the options from the backend
        let options = data.colors;
        console.log(options);
        // Loop through the array
        for (var i = 0; i < options.length; i++) {
            let opt = options[i];
            productConfiguration.innerHTML += "<option value=" + i + ">" + opt + "</option>";
        }

        // personnalisation of page title
        let pageTitle = document.getElementById("page-title");
        pageTitle.innerHTML = "Peluche " + data.name;

        // Collecting the color option chosen
        var e = document.getElementById("color");
        e.addEventListener('click', function () {
            let selectedColor = e.options[e.selectedIndex].text;
            console.log(selectedColor);
        });
        // Enregistrement des produits dans le panier

        var currentCart = (function () {
            cart = [];

            function Item(id, color, price,count) {
                this.id = id;
                this.color = color;
                this.price=price;
                this.count = count;
            }
            function savecart() {
                localStorage.setItem('currentCart', JSON.stringify(cart));
            }

            function loadcart() {
                cart = JSON.parse(localStorage.getItem('currentCart'));
            }
            if (localStorage.getItem("currentCart") != null) {
                loadcart();
            }

            var obj = {};

            obj.addProductToCart = function (id, color, price,count) {
                for (var item in cart) {
                    if (cart[item].id === id && cart[item].color === color) {
                        cart[item].count++;
                        savecart();
                        return;
                    }
                }

                var item = new Item(id, color, price, count);
                cart.push(item);
                savecart();
            }

            obj.setCountForItem = function (id, count) {
                for (var i in cart) {
                    if (cart[i].id === id && cart[item].color === color) {
                        cart[i].count = count;
                        break;
                    }
                }
            };

            obj.clearpanier = function() {
                cart = [];
                savecart();
                }

            return obj;
        })();
        document.getElementById('buy-button').addEventListener('click', async function (event) {
            event.preventDefault();
            console.log('Listening to event');
            var id = productId;
            var color = e.options[e.selectedIndex].text;
            var price= data.price/100;
            currentCart.addProductToCart(id, color, price,1);
            updateCount();
        })

    });