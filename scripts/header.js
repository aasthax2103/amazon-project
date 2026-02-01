export function getHeaderHTML() {
    const header = `<a href="amazon.html">
                        <img class="logo" src="../assets/amazon-logo-white.png">
                    </a>
                    <div class="search-container">
                        <input class="search-box js-search-box" placeholder="Search">
                        <img class="search-button js-search-button" src="../assets/search-icon.png">
                    </div>
                    <a class="returns" href="../components/orders.html">
                        Returns
                        <br>
                        <span class="order-text">& Orders</span>
                    </a>
                    <a href="checkout.html">
                        <p class="cart-size js-cart-size">0</p>
                        <img class="cart" src="../assets/cart-icon.png">
                    </a>`

    return header;
}

export function searchFunctionality() {
    const searchBox = document.querySelector('.js-search-box');

    searchBox.addEventListener('keydown', (e) => {
        if (e.key == 'Enter') {
            const searchBoxValue = searchBox.value.trim();
            window.location.href=`amazon.html?search=${encodeURIComponent(searchBoxValue)}`;
        }
    })

    const searchButton = document.querySelector('.js-search-button');

    searchButton.addEventListener('click', () => {
        const searchBoxValue = searchBox.value.trim();
        window.location.href=`amazon.html?search=${encodeURIComponent(searchBoxValue)}`;
    })
}