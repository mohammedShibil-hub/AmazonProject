import {cart, removeFromCart, updateDeliveryOption} from "../productPage/cart.js";
import {products} from "../productPage/product.js";
import {hello} from "https://unpkg.com/supersimpledev@1.0.1/hello.esm.js"
import { deliveryOptions } from "./deliveryOption.js";
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

hello();
const today = dayjs()
const deliveryDate = today.add(7, 'days')
console.log(deliveryDate.format('dddd, MMMM D'));


 

let cartSummaryHTML = "";

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

    const deliveryOptionId = cartItem.deliveryOptionId;
    let deliveryOption = deliveryOptions.find(option => option.id === deliveryOptionId); // for get full delivery option in code using one data (normalizing the data)
    // instead of this 
    /* deliveryOption.forEach((option) => {
        if (option.id === deliveryOptionId) {
            deliveryOption = option;
        }  
    }); */

    if(!deliveryOption) {
        console.warn(`delivery id ${deliveryOptionId} not found`);
        deliveryOption = deliveryOptions[0]
        
    }

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
        const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
        const dateString = deliveryDate.format('dddd, MMMM D');
        const priceString = deliveryOption.priceCents === 0
        ? 'FREE'                                    //act like if statement. statement is true work this
        : `$${deliveryOption.priceCents / 100} -`;  // false work this

        const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
        console.log(deliveryOption.deliveryDays);

        html += ` 
            <div class="op1 js-delivery-option"
            data-product-id="${matchingProduct.id}"
            data-delivery-option-id="${deliveryOption.id}">
                <input type="radio" ${isChecked ? 'checked': ''} name="delivery-option-${matchingProduct.id}">
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

document.querySelectorAll('.js-delivery-option')
    .forEach((element) => {
        element.addEventListener('click', () => {
            const {productId, deliveryOptionId} = element.dataset;//shorthand property of this
            /*
                const productId = element.dataset.productId
                const deliveryOptionId = element.dataset.deliveryOptionId
            */
            updateDeliveryOption(productId, deliveryOptionId);
        })
    })

//21 special class for get diffrent class name using id, for remove html when click delete button
//30 .toFixed(2) for display 2 number/2 decimal
//37 name ="select${matchingProduct.id}" for separate name for separate items to avoid radio butten conflict
//32 data-product-id="${matchingProduct.id}" for which product is delete using id 
//73 checked on radio input for radio is currectly check date using id

