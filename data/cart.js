export let cart = [{
    id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 2
},
{
    id: "54e0eccd-8f36-462b-b68a-8182611d9add",
    quantity: 1   
},
{
    id: "58b4fc92-e98c-42aa-8c55-b6b79996769a",
    quantity: 1
}];

export function addToCart(productId) {
    let matchingProduct;
    cart.forEach((item) => {
        if (productId===item.productId) {
            matchingProduct = item;
        }
    })
    if (matchingProduct) {
        matchingProduct.quantity++;
    }
    else {
        cart.push({
            productId: productId,
            quantity: 1
        });
    }
}

export function removeFromCart(productId) {
    let newCart = [];
    cart.forEach((cartItem) => {
        if (cartItem.id !== productId) {
            newCart.push(cartItem);
        }
    })
    cart=newCart;
}