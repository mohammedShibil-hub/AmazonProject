export let cart = JSON.parse(localStorage.getItem('cart')); 

if (!cart) {
    cart = [{
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 2,
        deliveryid: '1'
    }, {
        productId: '3ebe75dc-64d2-4137-8860-1f5a963e534b',
        quantity: 1,
        deliveryid: '2'
    }];
}
/*function clearCart() {
    localStorage.removeItem('cart')
    cart = [];
} *///for cart quantity is bug like duplicate item in cart eg-(in 0 jump to 30) 
 //we can reset localstorage item in console, using localStorage.removeItem('cart')
 /*suppose code are write currectly but show error ,that means localstorage is saved bad data.
 solve this issue using localStorage.clear()*/

function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function addtoCart(productId) {
    let matchingItem;

    cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
            matchingItem = cartItem;
        }
        //for check same item in cart
    });

    if(matchingItem) {
        matchingItem.quantity += 1;
        //same item in cart then add quatity 
    } else{
        cart.push({
            productId: productId,
            quantity: 1,
            deliveryid: '1'
        });
        //if it's not in the cart then product in the cart
    }

    saveToStorage();
}

export function removeFromCart(productId) {
    const newCart = [];

    cart.forEach((cartItem) => {
        if (cartItem.productId !== productId) {
            newCart.push(cartItem);
        }
    });

    cart = newCart;
    saveToStorage();
}

