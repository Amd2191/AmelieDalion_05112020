let carts = document.getElementsByClassName('add-to-cart');

for (let i=0;i<carts.length;i++){
    carts[i].addEventListener('click',()=>{
        event.preventDefault();
        console.log('added')
        cartNumbers()
    })
}
function cartNumbers(){
    let numberOfProducts = localStorage.getItem('cartNumbers')
    localStorage.setItem('cartNumbers',1);
}