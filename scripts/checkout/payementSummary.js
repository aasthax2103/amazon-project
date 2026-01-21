import {cart, calculateCartSize} from '../../data/cart.js';
import {getProduct} from '../../data/products.js';
import {getDeliveryOption} from '../../data/deliveryOptions.js';
import {formatCurrency} from '../utils/money.js';

export function renderPaymentSummary() {
    let productPriceCents = 0;
    let shippingCharges = 0;
    cart.forEach((cartItem) => {
        const product = getProduct(cartItem.id);
        productPriceCents += cartItem.quantity*product.priceCents;

        const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
        shippingCharges += deliveryOption.priceCents;
    })

    const priceBeforeTaxes = productPriceCents+shippingCharges;
    const taxAmount = priceBeforeTaxes*0.1;
    const totalPrice = priceBeforeTaxes+taxAmount;

    document.querySelector('.js-payment-summary')
        .innerHTML = `<p class="order-summary">Order Summary</p>
                        <div class="summary-detail">
                            <div class="summary-top">
                                <div class="summary-top-left">
                                    <p>Items (${calculateCartSize()}):</p>
                                    <p>Shipping & handling:</p>
                                    <hr class="invisible-divider">
                                    <p>Total before tax:</p>
                                    <p>Estimated tax (10%):</p>
                                </div>
                                <div class="summary-top-right">
                                    <p>$${formatCurrency(productPriceCents)}</p>
                                    <p>$${formatCurrency(shippingCharges)}</p>
                                    <hr class="visible-divider">
                                    <p>$${formatCurrency(priceBeforeTaxes)}</p>
                                    <p>$${formatCurrency(taxAmount)}</p>
                                </div>
                            </div>
                            <hr class="visible-divider">
                            <div class="summary-bottom">
                                <div class="summary-bottom-left">
                                    <p>Order Total:</p>
                                </div>
                                <div class="summary-bottom-right">
                                    <p>$${formatCurrency(totalPrice)}</p>
                                </div>
                            </div>
                        </div>
                        <button class="order">Place your order</button>`
}