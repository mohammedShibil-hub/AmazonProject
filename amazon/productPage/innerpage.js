
import {cart, addtoCart} from '../productPage/cart.js';
import { products} from '../productPage/product.js';

let productsHTML = '';

products.forEach((product) => {
    productsHTML += `
    <div class="box-div">
        <div class="pics">
            <img src="${product.image}">
        </div>
        <div class="discription">
            ${product.name}
        </div>
        <div class="star-rating">
            <img src="/amazon/props/ratings/rating-${product.rating.stars * 10}.png">
            <div class="rating-cound">${product.rating.count}</div>
        </div>
        <div class="amound">
            $${(product.priceCents / 100).toFixed(2) //bracket and .tofixed()  add for display 2 number eg=(10.9 = 10.90) 
                }
        </div>
        <div class="quantity">
            <select class="js-quantity-selector-${product.image}">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
            </select>
        </div>
        <div class="added">
            <img src="/amazon/props/simbels/checkmark.png" alt="">
            Added
        </div>
        <button class="js-addCart" data-product-id="${product.id}">Add to Cart</button>
    </div>`
});



document.querySelector('.js-grid').innerHTML = productsHTML;

function updateCartQuantity() {
    let cartQuantity = 0;

            cart.forEach((cartItem) => {
                cartQuantity += cartItem.quantity;
            });
            //for total quantity check

            document.querySelector('.js-add').innerHTML = cartQuantity;
            //for update quantity on cart image

}


document.querySelectorAll('.js-addCart')
    .forEach((button) => {
        button.addEventListener('click', () =>{
            //setInterval()
            //console.log(button.dataset.productId);
            const productId = button.dataset.productId;
            // for show product name

            addtoCart(productId);
            updateCartQuantity()
        });
    });