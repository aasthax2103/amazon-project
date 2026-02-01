import {products, loadProductsFetch} from '../data/products.js';
import {cart, addToCart, updateCartSize} from '../data/cart.js';
import {formatCurrency} from './utils/money.js';
import { getHeaderHTML, searchFunctionality } from './header.js';

async function loadPage() {
    try {
        await loadProductsFetch();
    } catch(error) {
        console.log('Unexpected error. Please try again later.');
    }
    renderProductsGrid()
}
loadPage();

function renderProductsGrid() {

    document.querySelector('.js-header').innerHTML = getHeaderHTML();
    searchFunctionality();
    const url = new URL(window.location.href);
    const searchParam = url.searchParams.get('search');

    let filteredProducts = products;
    if (searchParam && searchParam.trim() !== '') {
        filteredProducts = products.filter((product) => {
            let searchParamLowerCase = searchParam.toLowerCase();
            let nameMatch = product.name.toLowerCase().includes(searchParamLowerCase);
            let keywordMatch = product.keywords && product.keywords.some((keyword) => {
                return keyword.toLowerCase().includes(searchParamLowerCase);
            })
            return nameMatch || keywordMatch;
        })
        document.querySelector('.js-search-box').value = searchParam;
    }

    let productHTML = '';

    filteredProducts.forEach((product) => {
        productHTML+=`<div class="product">
                    <div class="image-container">
                        <img class="product-image" src="${product.getImage()}">
                    </div>
                    <p class="name">${product.name}</p>
                    <div class="rating">
                        <img class="rating-stars" src="${product.getStars()}">
                        <p class="rating-num">${product.rating.count}</p>
                    </div>
                    <p class="price">$${product.getPrice()}</p>
                    <div class="quantity-and-size">
                        <select class="quantity js-quantity">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                            <option>6</option>
                            <option>7</option>
                            <option>8</option>
                            <option>9</option>
                            <option>10</option>
                        </select>
                        <div class="sizechart">${product.extraInfoHTML()}</div>
                    </div>
                    <div class="added-container js-added-container">
                        <img class="checkmark" src="../assets/checkmark.png">
                        <p class="added">Added</p>
                    </div>
                    <button class="add-to-cart js-add-to-cart" data-product-id=${product.id}>Add To Cart</button>
                </div>`;
    });

    document.querySelector('.js-product-container').innerHTML = productHTML;

    updateCartSize();

    function displayAdded(button) {
        const addedContainer = button.closest('.product').querySelector('.js-added-container');
        addedContainer.style.opacity=1;

        if (addedContainer.timeOutId) {
            clearTimeout(addedContainer.timeOutId);
        }

        addedContainer.timeOutId = setTimeout(() => {
            addedContainer.style.opacity=0;
        }, 1000);
    }

    document.querySelectorAll('.js-add-to-cart').forEach((button) => {
        button.addEventListener('click', () => {
            const productId = button.dataset.productId;

            const quantitySelect = button.closest('.product').querySelector('.js-quantity');
            const quantity = Number(quantitySelect.value);

            addToCart(productId, quantity);
            updateCartSize();
            displayAdded(button);

            quantitySelect.value = '1';
        })
    });
}