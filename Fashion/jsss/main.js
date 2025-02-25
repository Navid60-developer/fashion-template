document.addEventListener("DOMContentLoaded", function () {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    function saveCart() {
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    function updateCartDisplay() {
        let itemCountElement = document.querySelector(".item-count");
        let totalPriceElement = document.querySelector(".total-price");
        let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        let totalPrice = cart.reduce((sum, item) => sum + item.quantity * item.price, 0);

        if (itemCountElement) itemCountElement.innerText = totalItems;
        if (totalPriceElement) totalPriceElement.innerText = `$${totalPrice.toFixed(2)}`;

        let hasItems = totalItems > 0;
        if (itemCountElement) itemCountElement.style.cssText = hasItems ? "background:red; color:white" : "";
        if (totalPriceElement) totalPriceElement.style.cssText = hasItems ? "background:red; color:white" : "";
    }

    function addProductToCart(productName, productPrice) {
        if (isNaN(productPrice) || productPrice <= 0) return console.error("Invalid price:", productPrice);

        let existingProduct = cart.find(item => item.name === productName);
        existingProduct ? existingProduct.quantity++ : cart.push({ name: productName, price: productPrice, quantity: 1 });

        saveCart();
        updateCartDisplay();
    }

    function modifyProductQuantity(productName, action) {
        let product = cart.find(item => item.name === productName);
        if (!product) return;

        if (action === "increase") product.quantity++;
        else if (action === "decrease" && product.quantity > 0) {
            product.quantity--;
            if (product.quantity === 0) cart = cart.filter(item => item.name !== productName);
        }

        saveCart();
        updateCartDisplay();
    }

    function clearCart() {
        cart = [];
        saveCart();
        updateCartDisplay();
    }

    function openProductSelectionModal(action) {
        let modal = document.getElementById("productModal");
        let productSelect = document.getElementById("productSelect");
        if (!modal || !productSelect) return;

        productSelect.innerHTML = "";
        cart.forEach(product => {
            let option = document.createElement("option");
            option.value = product.name;
            option.textContent = `${product.name} - $${product.price.toFixed(2)}`;
            productSelect.appendChild(option);
        });

        modal.setAttribute("data-action", action);
        modal.style.display = "flex";
    }

    function closeProductSelectionModal() {
        let modal = document.getElementById("productModal");
        if (modal) modal.style.display = "none";
    }

    document.body.addEventListener("click", function (event) {
        let target = event.target;

        if (target.classList.contains("add-to-cart")) {
            let productName = target.getAttribute("data-product-name");
            let productPrice = parseFloat(target.getAttribute("data-product-price"));
            addProductToCart(productName, productPrice);
        }

        if (target.classList.contains("cart-increase")) {
            cart.length > 1 ? openProductSelectionModal("increase") : modifyProductQuantity(cart[0].name, "increase");
        }

        if (target.classList.contains("cart-decrease")) {
            cart.length > 1 ? openProductSelectionModal("decrease") : modifyProductQuantity(cart[0].name, "decrease");
        }

        if (target.classList.contains("cart-clear")) {
            clearCart();
        }

        if (target.id === "confirmSelection") {
            let modal = document.getElementById("productModal");
            let selectedProduct = document.getElementById("productSelect").value;
            let action = modal ? modal.getAttribute("data-action") : null;
            if (selectedProduct) {
                modifyProductQuantity(selectedProduct, action);
                closeProductSelectionModal();
            }
        }

        if (target.id === "cancelSelection") {
            closeProductSelectionModal();
        }
    });

    updateCartDisplay();
});
