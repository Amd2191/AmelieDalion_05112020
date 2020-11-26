// Retrieve data from the local storage
let total = JSON.parse(localStorage.getItem('total amount of order'));
console.log(total);
let orderId = JSON.parse(localStorage.getItem('order Id'));
console.log(orderId);


// Place all product lines in cart

let cartContainer = document.getElementById('order-information-container');

let introduction=document.createElement('div');
let order=document.createElement('div');

cartContainer.appendChild(introduction);
cartContainer.appendChild(order);

introduction.innerHTML="Voici le détail de votre commande:";
order.innerHTML=("Le numéro de votre commande est "+orderId+" pour un total de "+total+" €");

localStorage.clear();
