export let cart = JSON.parse(localStorage.getItem('cart'));

if (!cart) {
    cart=[];

    // CHANGE CART TO THE CODE BELOW IF THERE IS ANY COMPLICATION LATER ON BECAUSE OF EMPTY CART OR LOCAL STORAGE
    // cart = [{
    //     id: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    //     quantity: 2
    // },
    // {
    //     id: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    //     quantity: 1
    // },
    // {
    //     id: '54e0eccd-8f36-462b-b68a-8182611d9add',
    //     quantity: 1
    // }]

    //These default values will only come on screen when local storage has not been set initially, 
    // but for empty local storage, cart will be empty only, not these default values
    // To reset local storage-> inspect-> console-> write: localStorage.removeItem('cart')->Enter
}

function saveToLocalStorage() {
    localStorage.setItem('cart' , JSON.stringify(cart));
}

export function addToCart(productId) {
    let matchingProduct;
    cart.forEach((item) => {
        if (productId===item.id) {
            matchingProduct = item;
        }
    })
    if (matchingProduct) {
        matchingProduct.quantity++;
    }
    else {
        cart.push({
            id: productId,
            quantity: 1
        });
    }
    saveToLocalStorage();
}

export function removeFromCart(productId) {
    let newCart = [];
    cart.forEach((cartItem) => {
        if (cartItem.id !== productId) {
            newCart.push(cartItem);
        }
    })
    cart=newCart;
    saveToLocalStorage();
}