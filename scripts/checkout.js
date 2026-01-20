import {cart, removeFromCart} from '../data/cart.js';
import {products} from '../data/products.js';
import {formatCurrency} from './utils/money.js';

let checkoutHTML = '';

cart.forEach((cartItem) => {
    let matchingProduct;
    products.forEach((product) => {
        if (product.id===cartItem.id) {
            matchingProduct=product;
            
        }
    })
    checkoutHTML += `<div class="left-box js-cart-item-container-${matchingProduct.id}">
                    <div class="left-box-child">
                        <p class="delivery-date">Delivery date: Wednesday, January 14</p>
                        <div class="item-box-container">
                            <div class="item-image-container">
                                <img class="item-image" src="../assets/${matchingProduct.image}">
                            </div>
                            <div class="item-info">
                                <p class="bold-sub-heading">${matchingProduct.name}</p>
                                <p class="price">$${formatCurrency(matchingProduct.priceCents)}</p>
                                <p>Quantity: ${cartItem.quantity} <span class="modify-order">Update</span> <span class="modify-order js-delete-link" data-product-id=${matchingProduct.id}>Delete</span></p>
                            </div>
                            <div class="delivery-option">
                                <p class="bold-sub-heading">Choose a delivery option:</p>
                                <label class="delivery-option-container">
                                    <input type="radio" name="delivery-option-${matchingProduct.id}" value="standard" checked>
                                    <div class="delivery-option-sub-container">
                                        <span class="delivery-option-green">Tuesday, January 20</span>
                                        <span class="delivery-option-gray">FREE Shipping</span>
                                    </div>
                                </label>
                                <br>
                                <label class="delivery-option-container">
                                    <input type="radio" name="delivery-option-${matchingProduct.id}" value="express">
                                    <div class="delivery-option-sub-container">
                                        <span class="delivery-option-green">Wednesday, January 14</span>
                                        <span class="delivery-option-gray">$4.99 - Shipping</span>
                                    </div>
                                </label>
                                <br>
                                <label class="delivery-option-container">
                                    <input type="radio" name="delivery-option-${matchingProduct.id}" value="next-day">
                                    <div class="delivery-option-sub-container">
                                        <span class="delivery-option-green">Monday, January 12</span>
                                        <span class="delivery-option-gray">$9.99 Shipping</span>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>`
})
document.querySelector('.js-left-box').innerHTML = checkoutHTML;

document.querySelectorAll('.js-delete-link')
    .forEach((link)=> {
        link.addEventListener('click', () => {
            let productId =  link.dataset.productId;
            removeFromCart(productId);

            document.querySelector(`.js-cart-item-container-${productId}`).remove();
        })
    })

