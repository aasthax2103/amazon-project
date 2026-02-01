import {orders} from "../data/orders.js";
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { getProduct, loadProductsFetch, products } from "../data/products.js";
import {formatCurrency} from './utils/money.js';
import { cart, updateCartSize, addToCart } from "../data/cart.js";
import { getHeaderHTML, searchFunctionality } from "./header.js";

function renderBuyPage() {

    document.querySelector('.js-header').innerHTML = getHeaderHTML();
    updateCartSize();
    searchFunctionality();

    let orderContainerHTML = '';

    orders.forEach((order) => {

        let itemContainerHTML = '';

        order.products.forEach((item) => {

            const matchingProduct = getProduct(item.productId);
            const deliveryTime = dayjs(item.estimatedDeliveryTime).format('MMMM D');

            itemContainerHTML += `<div class="item-container">
                            <div class="image-container">
                                <img class="image" src="../assets/${matchingProduct.getImage()}">
                            </div>
                            <div class="info">
                                <p class="item-name">${matchingProduct.name}</p>
                                <p>Arriving on: ${deliveryTime}</p>
                                <p>Quantity: ${item.quantity}</p>
                                <button class="buy-again js-buy-again" data-product-id=${item.productId} data-quantity=${item.quantity}>
                                    <img class="buy-again-icon" src="../assets/buy-again.png">
                                    Buy it again
                                </button>
                            </div>
                            <a class="track-container" href="tracking.html?orderId=${order.id}&productId=${item.productId}">
                                <button class="track">Track package</button>
                            </a>
                        </div>`
        })

        const orderDate = dayjs(order.orderTime).format('MMMM D');
        const total = formatCurrency(order.totalCostCents);

        orderContainerHTML +=`<div class="order-id-container">
                    <div class="header-box">
                        <div class="order-placed">
                            <p class="sub-heading">Order Placed:</p>
                            <p>${orderDate}</p>
                        </div>
                        <div class="total">
                            <p class="sub-heading">Total</p>
                            <p>$${total}</p>
                        </div>
                        <div class="order-id">
                            <p class="sub-heading">Order ID:</p>
                            <p>${order.id}</p>
                        </div>
                    </div>
                    <div class="body-box js-body-box">
                        ${itemContainerHTML}
                    </div>`
    })

    document.querySelector('.js-order-container').innerHTML = orderContainerHTML;

    document.querySelectorAll('.js-buy-again').forEach((button) => {
        button.addEventListener('click', () => {

            const productId = button.dataset.productId;
            const quantity = Number(button.dataset.quantity);

            addToCart(productId, quantity);
            updateCartSize();

            button.innerHTML = '✓ Added';
        });
    });
}

loadProductsFetch().then(() => {
    renderBuyPage();
})