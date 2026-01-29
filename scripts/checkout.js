import {renderOrderSummary} from './checkout/orderSummary.js';
import {renderPaymentSummary} from './checkout/paymentSummary.js';
// import '../../data/oops/cart-class.js';
import { loadProducts } from '../data/products.js';

loadProducts(() => {
    renderOrderSummary();
    renderPaymentSummary();
});