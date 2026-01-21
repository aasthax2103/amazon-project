import {cart, removeFromCart, updateDeliveryOption, updateCartSize} from '../../data/cart.js';
import {getProduct, products} from '../../data/products.js';
import {formatCurrency} from '../utils/money.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import {deliveryOptions, getDeliveryOption} from '../../data/deliveryOptions.js';
import {renderPaymentSummary} from './paymentSummary.js';

export function renderOrderSummary() {

    //In this function we have just put the entire code nto renderOrderSummary and called it 
    //outside and on updation of the delivery option. This will simply regerate all the HTML again.

    let checkoutHTML = '';

    cart.forEach((cartItem) => {
        const matchingProduct = getProduct(cartItem.id);
        const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);

        const today = dayjs();
        const date = today.add(deliveryOption.deliveryDays, 'days');
        const formatDate = date.format('dddd, MMMM D');

        checkoutHTML += `<div class="left-box js-cart-item-container-${matchingProduct.id}">
                        <div class="left-box-child js-left-box-child">
                            <p class="delivery-date">Delivery date: ${formatDate}</p>
                            <div class="item-box-container">
                                <div class="item-image-container">
                                    <img class="item-image" src="../assets/${matchingProduct.image}">
                                </div>
                                <div class="item-info">
                                    <p class="bold-sub-heading">${matchingProduct.name}</p>
                                    <p class="price">$${formatCurrency(matchingProduct.priceCents)}</p>
                                    <div class="quantity-without-updation">
                                        <p>Quantity: ${cartItem.quantity} <span class="modify-order js-update-link">Update</span> <span class="modify-order js-delete-link" data-product-id=${matchingProduct.id}>Delete</span></p>
                                    </div>
                                    <div class="quantity-after-updation">
                                        <p>Quantity: <input type="number" min="1" class="update-quantity js-update-quantity" value="${cartItem.quantity}"> <span class="modify-order js-save-link" data-product-id="${matchingProduct.id}">Save</span> <span class="modify-order js-delete-link" data-product-id=${matchingProduct.id}>Delete</span></p>
                                    </div>
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

    document.querySelectorAll('.js-update-link')
        .forEach((link) => {
            link.addEventListener('click', () => {
                const viewState = link.closest('.js-left-box-child').querySelector('.quantity-without-updation');
                const editState = link.closest('.js-left-box-child').querySelector('.quantity-after-updation');

                viewState.style.display= 'none';
                editState.style.display= 'block';
            })
        })

    document.querySelectorAll('.js-save-link')
        .forEach((link) => {
            link.addEventListener('click', () => {
                const viewState = link.closest('.js-left-box-child').querySelector('.quantity-without-updation');
                const editState = link.closest('.js-left-box-child').querySelector('.quantity-after-updation');

                const input = editState.querySelector('.js-update-quantity');
                const newQuantity = Number(input.value);

                const productId = link.dataset.productId;
                cart.forEach((cartItem) => {
                    if (cartItem.id===productId) {
                        cartItem.quantity=newQuantity;
                    }
                })
                renderOrderSummary();
                renderPaymentSummary();

                viewState.style.display= 'block';
                editState.style.display= 'none';
            })
        })

    document.querySelectorAll('.js-delete-link')
        .forEach((link)=> {
            link.addEventListener('click', () => {
                let productId =  link.dataset.productId;
                removeFromCart(productId);
                renderPaymentSummary();
                updateCartSize();

                document.querySelector(`.js-cart-item-container-${productId}`).remove();
            })
        })

    document.querySelectorAll('.js-delivery-option')
        .forEach((deliveryOption) => {
            deliveryOption.addEventListener('click', () => {
                const {productId, deliveryOptionId} = deliveryOption.dataset;
                updateDeliveryOption(productId, deliveryOptionId);
                renderOrderSummary();
                renderPaymentSummary();
            });
        })

    updateCartSize();
}