class Cart {
    cartItems;
    #localStorageKey;

    constructor(localStorageKey) {
        this.#localStorageKey = localStorageKey;
        this.#loadFromStorage();
    }
    // adding '#' makes the variable or function private, it cannot be accessed outside the class, specially used for all things of constructor shayad

    #loadFromStorage() {
        this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey));

        if (!this.cartItems) {
        this.cartItems = [];
        }
    }

    saveToLocalStorage() {
        localStorage.setItem(this.#localStorageKey , JSON.stringify(this.cartItems));
    }

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
    }

    removeFromCart(productId) {
        let newCart = [];
        this.cartItems.forEach((cartItem) => {
            if (cartItem.id !== productId) {
                newCart.push(cartItem);
            }
        })
        this.cartItems=newCart;
        this.saveToLocalStorage();
    }

    updateDeliveryOption(productId, deliveryOptionId) {
        let matchingProduct;
        this.cartItems.forEach((cartItem) => {
            if (productId===cartItem.id) {
                matchingProduct = cartItem;
            }
        })
        matchingProduct.deliveryOptionId = deliveryOptionId;
        this.saveToLocalStorage();
    }

    updateCartSize() {
        let cartSize = 0;

        this.cartItems.forEach((item) => {
            cartSize+=1;
        })

        document.querySelector('.js-cart-size').innerHTML= cartSize;
        return cartSize;
    }
}

const cart = new Cart('cart-oops');
const businessCart = new Cart('businessCart-oops');

console.log(cart);
console.log(businessCart);
console.log(businessCart instanceof Cart);  //just to verify if we want to