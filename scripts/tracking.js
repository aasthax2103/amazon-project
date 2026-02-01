import { updateCartSize } from "../data/cart.js";
import {getOrder, getExactProductFromOrder} from "../data/orders.js";
import {getProduct, loadProductsFetch} from "../data/products.js";
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { getHeaderHTML, searchFunctionality } from "./header.js";

const url = new URL(window.location.href);
const orderId = url.searchParams.get('orderId');
const productId = url.searchParams.get('productId');

loadProductsFetch().then(() => {

    document.querySelector('.js-header').innerHTML = getHeaderHTML();
    updateCartSize();
    searchFunctionality();

    const order = getOrder(orderId);
    const product = getProduct(productId);
    const productFromOrder = getExactProductFromOrder(order, productId);

    let trackHTML = document.querySelector('.js-track-container');

    const deliveryTime = productFromOrder.estimatedDeliveryTime;
    const deliveryTimeObj = dayjs(deliveryTime);
    const currTimeObj = dayjs();
    const orderTimeObj = dayjs(order.orderTime);
    const progressWidth = Math.max(5,(currTimeObj.diff(orderTimeObj))/(deliveryTimeObj.diff(orderTimeObj))*100);
    const estimatedDelivery = dayjs(deliveryTime).format('MMMM D');

    trackHTML.innerHTML = `<p class="arrival">Arriving on Tuesday, ${estimatedDelivery}</p>
        <p class="normal-text">${product.name}</p>
        <p class="normal-text">Quantity: ${productFromOrder.quantity}</p>
        <img class="image" src="../assets/${product.getImage()}">
        <div class="state">
            <p class="preparing">Preparing</p>
            <p class="shipped">Shipped</p>
            <p class="delivered">Delivered</p>
        </div>
        <div class="bar-outline">
            <div class="bar" style="width: ${progressWidth}%"></div>
        </div>`

    const preparing = document.querySelector('.preparing');
    const shipped = document.querySelector('.shipped');
    const delivered = document.querySelector('.delivered');

    if (progressWidth < 50) {
    preparing.style.color = "rgb(6, 121, 6)";
    }

    else if (progressWidth < 100) {
    preparing.style.color = "rgb(6, 121, 6)";
    shipped.style.color = "rgb(6, 121, 6)";
    }

    else {
    preparing.style.color = "rgb(6, 121, 6)";
    shipped.style.color = "rgb(6, 121, 6)";
    delivered.style.color = "rgb(6, 121, 6)";
    }
})