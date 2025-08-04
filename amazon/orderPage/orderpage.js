import {cart, removeFromCart} from "../productPage/cart.js";
import {products} from "../productPage/product.js";
import {hello} from "https://unpkg.com/supersimpledev@1.0.1/hello.esm.js"
import { deliveryOptions } from "./deliveryOption.js";

hello();
const today = dayjs()
const deliveryDate = today.add(7, 'days')
deliveryDate.format('dddd, MMMM D');
console.log(deliveryDate.format('dddd, MMMM D'));


 

let cartSummaryHTML = '';

cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    let matchingProduct = products.find(product => product.id === productId); // for get full product details in code using one data (normalizing the data)

/*    products.forEach((product) => {
        if (product.id === productId) {
            matchingProduct = product;
        }  
    });*/

    if (!matchingProduct) {
        console.warn(`product with ID ${productId} not found`);
        return;
    }

    const deliveryid = cartItem.deliveryid;
    let deliveryOption = deliveryOptions.find(Option => Option.id === deliveryid); // for get full delivery option in code using one data (normalizing the data)
    // instead of this 
    /* deliveryOption.forEach((option) => {
        if (option.id === deliveryid) {
            deliveryOption = option;
        }  
    }); */
     const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'days')
    const dateString = deliveryDate.format('dddd, MMMM D');

    cartSummaryHTML += `
    <div class="order-box js-cart-container-${matchingProduct.id}">
        <div class="time">Delivery date: ${dateString}</div>
        <div class="grid">
            <div class="pic">
                <img src="${matchingProduct.image}">
            </div>
            <div class="center1">
                <div class="description">${matchingProduct.name}</div>
                <div class="amound">$${(matchingProduct.priceCents / 100).toFixed(2)}</div>
                <div class="quantity">Quantity: ${cartItem.quantity}</div> 
                <div class="button"> Update</div>
                <div class="button js-delete-button" data-product-id="${matchingProduct.id}"> Delete</div>
            </div>
            <div class="option">
                <div class="op">Choose a delivery option:</div>
                ${deliveryOptionHTML(matchingProduct, cartItem)}
            </div>
        </div>
    </div>`;
});

function deliveryOptionHTML(matchingProduct, cartItem) {
    let html = '';

    deliveryOptions.forEach((deliveryOption) => {
        const today = dayjs();
        const deliveryDate = today.add(deliveryOption.deliveryDays, 'days')
        const dateString = deliveryDate.format('dddd, MMMM D');

        const priceString = deliveryOption.priceCents === 0
        ? 'FREE'                                    //act like if statement. statement is true work this
        : `$${deliveryOption.priceCents / 100} -`;  // false work this

        const isChecked = deliveryOption.id === cartItem.deliveryid

        html += ` 
            <div class="op1">
                <input type="radio" ${isChecked ? 'checked': ''} name="select${matchingProduct.id}" value="day1">
                <div class="details">
                    <div class="day1">${dateString}</div>
                    <div class="cost">${priceString} Shipping</div>
                </div>
            </div>
        `
    });
    return html;
}

document.querySelector('.js-order-container').innerHTML = cartSummaryHTML;
//for generating html

document.querySelectorAll('.js-delete-button').forEach((link) => {
        link.addEventListener('click', () => {
          const productId = link.dataset.productId;
          removeFromCart(productId);
          // remove product from webpage

          const container = document.querySelector(`.js-cart-container-${productId}`);
          container.remove();    
        });
    });

//21 special class for get diffrent class name using id, for remove html when click delete button
//30 .toFixed(2) for display 2 number/2 decimal
//37 name ="select${matchingProduct.id}" for separate name for separate items to avoid radio butten conflict
//32 data-product-id="${matchingProduct.id}" for which product is delete using id 
//73 checked on radio input for radio is currectly check date using id