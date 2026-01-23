function Cart(localStorageKey) {
    const cart = {
        cartItems: undefined,

            loadFromStorage() {
                this.cartItems = JSON.parse(localStorage.getItem(localStorageKey));

                if (!this.cartItems) {
                this.cartItems = [];
                }
            },
            // created a separate function because 'if()' and 'this' does not work outside of a method

            saveToLocalStorage() {
                localStorage.setItem(localStorageKey , JSON.stringify(this.cartItems));
            }, 

            addToCart(productId, quantity) {
                let matchingProduct;
                this.cartItems.forEach((item) => {
                    if (productId===item.id) {
                        matchingProduct = item;
                    }
                })
                if (matchingProduct) {
                    matchingProduct.quantity += quantity;
                }
                else {
                    this.cartItems.push({
                        id: productId,
                        quantity: quantity,
                        deliveryOptionId: '1'
                    });
                }
                this.saveToLocalStorage();
            },

            removeFromCart(productId) {
                let newCart = [];
                this.cartItems.forEach((cartItem) => {
                    if (cartItem.id !== productId) {
                        newCart.push(cartItem);
                    }
                })
                this.cartItems=newCart;
                this.saveToLocalStorage();
            },

            updateDeliveryOption(productId, deliveryOptionId) {
                let matchingProduct;
                this.cartItems.forEach((cartItem) => {
                    if (productId===cartItem.id) {
                        matchingProduct = cartItem;
                    }
                })
                matchingProduct.deliveryOptionId = deliveryOptionId;
                this.saveToLocalStorage();
            },

            updateCartSize() {
                let cartSize = 0;

                this.cartItems.forEach((item) => {
                    cartSize+=1;
                })

                document.querySelector('.js-cart-size').innerHTML= cartSize;
                return cartSize;
            }
        }
    return cart;
}


const cart = Cart('cart-oops');
const businessCart = Cart('businessCart-oops');

cart.loadFromStorage();
businessCart.loadFromStorage();
// called separately cause ek alag method mein daal diya tha loadFromStorage

cart.addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
cart.addToCart('15b6fc6f-327a-4ec4-896f-486349e85a3d');
businessCart.addToCart('83d4ca15-0f35-48f5-b7a3-1ea210004f2e');


console.log(cart);
console.log(businessCart);