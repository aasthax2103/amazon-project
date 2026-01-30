export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrder(order) {
    orders.unshift(order);
    saveToLocalStorage();
}

function saveToLocalStorage() {
    localStorage.setItem('orders', JSON.stringify(orders));
}

export function getOrder(orderId) {
    let matchingOrder = '';

    orders.forEach((order) => {
        if (orderId===order.id) {
            matchingOrder=order;
        }
    })

    return matchingOrder;
}

export function getExactProductFromOrder(order, productId) {
    let matchingProduct = '';

    order.products.forEach((product) => {
        if (productId === product.productId) {
            matchingProduct = product;
        }
    })

    return matchingProduct;
}