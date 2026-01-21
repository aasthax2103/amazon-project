import {cart, removeFromCart, updateDeliveryOption} from '../data/cart.js';
import {products} from '../data/products.js';
import {formatCurrency} from './utils/money.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import {deliveryOptions} from '../data/deliveryOptions.js';

function renderOrderSummary() {
    let checkoutHTML = '';

    cart.forEach((cartItem) => {
        let matchingProduct;
        products.forEach((product) => {
            if (product.id===cartItem.id) {
                matchingProduct=product;
                
            }
        })

        let deliveryOption;

        deliveryOptions.forEach((option) => {
            if (option.id===cartItem.deliveryOptionId) {
                deliveryOption=option;
            }
        })

        const today = dayjs();
        const date = today.add(deliveryOption.deliveryDays, 'days');
        const formatDate = date.format('dddd, MMMM D');

        checkoutHTML += `<div class="left-box js-cart-item-container-${matchingProduct.id}">
                        <div class="left-box-child">
                            <p class="delivery-date">Delivery date: ${formatDate}</p>
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
                                    ${deliveryOptionsHTML(matchingProduct, cartItem)}
                                </div>
                            </div>
                        </div>
                    </div>`
    })
    document.querySelector('.js-left-box').innerHTML = checkoutHTML;

    function deliveryOptionsHTML(matchingProduct, cartItem) {
            let deliveryHTML = '';

            deliveryOptions.forEach((option) => {

                const today = dayjs();
                const date = today.add(option.deliveryDays, 'days');
                const formatDate = date.format('dddd, MMMM D');
                const shippingCost = option.id === '1' ? 'FREE' : `$${formatCurrency(option.priceCents)} -`;
                const isChecked = option.id===cartItem.deliveryOptionId ? 'checked' : '';

                deliveryHTML += `<div class="delivery-option-container js-delivery-option" data-product-id=${matchingProduct.id} data-delivery-option-id=${option.id}>
                                    <input type="radio" name="delivery-option-${matchingProduct.id}" ${isChecked}>
                                    <div class="delivery-option-sub-container">
                                        <span class="delivery-option-green">${formatDate}</span>
                                        <span class="delivery-option-gray">${shippingCost} Shipping</span>
                                    </div>
                                </div>
                                <br>`
            })
            
            return deliveryHTML;
    }

    document.querySelectorAll('.js-delete-link')
        .forEach((link)=> {
            link.addEventListener('click', () => {
                let productId =  link.dataset.productId;
                removeFromCart(productId);

                document.querySelector(`.js-cart-item-container-${productId}`).remove();
            })
        })

    document.querySelectorAll('.js-delivery-option')
        .forEach((deliveryOption) => {
            deliveryOption.addEventListener('click', () => {
                const {productId, deliveryOptionId} = deliveryOption.dataset;
                updateDeliveryOption(productId, deliveryOptionId);
                renderOrderSummary();
            });
        })
}

renderOrderSummary();