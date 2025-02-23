// تعریف متغیر سبد خرید
let cart = [];

// تابع برای اضافه کردن محصول به سبد خرید
function addProductToCart(productName, productPrice) {
    if (isNaN(productPrice) || productPrice <= 0) {
        console.error('Invalid product price:', productPrice);
        return;
    }

    let existingProduct = cart.find(item => item.name === productName);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ name: productName, price: productPrice, quantity: 1 });
    }
    updateCartDisplay();
}

// تابع برای به‌روزرسانی نمایش سبد خرید
function updateCartDisplay() {
    let itemCountElement = document.querySelector('.item-count');
    let totalPriceElement = document.querySelector('.total-price');
    let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    let totalPrice = cart.reduce((sum, item) => sum + item.quantity * item.price, 0);

    itemCountElement.innerText = totalItems;
    totalPriceElement.innerText = `$${totalPrice.toFixed(2)}`;

    // تنظیم استایل برای تعداد و قیمت
    if (totalItems > 0) {
        itemCountElement.style.backgroundColor = 'red';
        totalPriceElement.style.backgroundColor = 'red';
        itemCountElement.style.color = 'white';
        totalPriceElement.style.color = 'white';
    } else {
        itemCountElement.style.backgroundColor = '';
        totalPriceElement.style.backgroundColor = '';
        itemCountElement.style.color = '';
        totalPriceElement.style.color = '';
    }
}

// تابع برای افزایش یا کاهش تعداد محصول
function modifyProductQuantity(productName, action) {
    let product = cart.find(item => item.name === productName);
    if (product) {
        if (action === 'increase') {
            product.quantity += 1;
        } else if (action === 'decrease' && product.quantity > 0) {
            product.quantity -= 1;
            if (product.quantity === 0) {
                cart = cart.filter(item => item.name !== productName);
            }
        }
        updateCartDisplay();
    }
}

// تابع برای باز کردن پنجره انتخاب محصول
function openProductSelectionModal(action) {
    let productSelect = document.getElementById('productSelect');
    productSelect.innerHTML = '';
    cart.forEach(product => {
        let option = document.createElement('option');
        option.value = product.name;
        option.textContent = `${product.name} - $${product.price.toFixed(2)}`;
        productSelect.appendChild(option);
    });
    document.getElementById('productModal').setAttribute('data-action', action);
    document.getElementById('productModal').style.display = 'flex'; // نمایش مدال
}

// تابع برای بستن پنجره انتخاب محصول
function closeProductSelectionModal() {
    document.getElementById('productModal').style.display = 'none'; // مخفی کردن مدال
}

// تابع برای مدیریت کلیک دکمه "Add to Cart"
function handleAddToCartClick(event) {
    const button = event.target;
    const productName = button.getAttribute('data-product-name');
    let productPrice = parseFloat(button.getAttribute('data-product-price'));

    // لاگ برای دیباگ
    console.log('Product Name:', productName);
    console.log('Raw Price:', button.getAttribute('data-product-price'));
    console.log('Parsed Price:', productPrice);

    // اعتبارسنجی مقدار قیمت
    if (isNaN(productPrice)) {
        console.error('Invalid product price:', button.getAttribute('data-product-price'));
        return;
    }

    addProductToCart(productName, productPrice);
}

// تابع برای ثبت دکمه‌های "Add to Cart" و سایر دکمه‌ها
function registerCartButtons() {
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.removeEventListener('click', handleAddToCartClick);
        button.addEventListener('click', handleAddToCartClick);
    });

    const increaseButton = document.querySelector('.cart-increase');
    const decreaseButton = document.querySelector('.cart-decrease');
    const clearButton = document.querySelector('.cart-clear');
    const confirmButton = document.getElementById('confirmSelection');
    const cancelButton = document.getElementById('cancelSelection');

    if (increaseButton) {
        increaseButton.removeEventListener('click', handleIncreaseButtonClick);
        increaseButton.addEventListener('click', handleIncreaseButtonClick);
    }

    if (decreaseButton) {
        decreaseButton.removeEventListener('click', handleDecreaseButtonClick);
        decreaseButton.addEventListener('click', handleDecreaseButtonClick);
    }

    if (clearButton) {
        clearButton.removeEventListener('click', handleClearButtonClick);
        clearButton.addEventListener('click', handleClearButtonClick);
    }

    if (confirmButton) {
        confirmButton.removeEventListener('click', handleConfirmButtonClick);
        confirmButton.addEventListener('click', handleConfirmButtonClick);
    }

    if (cancelButton) {
        cancelButton.removeEventListener('click', handleCancelButtonClick);
        cancelButton.addEventListener('click', handleCancelButtonClick);
    }
}

// تابع برای مدیریت کلیک دکمه افزایش
function handleIncreaseButtonClick() {
    if (cart.length > 1) {
        openProductSelectionModal('increase');
    } else if (cart.length === 1) {
        modifyProductQuantity(cart[0].name, 'increase');
    }
}

// تابع برای مدیریت کلیک دکمه کاهش
function handleDecreaseButtonClick() {
    if (cart.length > 1) {
        openProductSelectionModal('decrease');
    } else if (cart.length === 1) {
        modifyProductQuantity(cart[0].name, 'decrease');
    }
}

// تابع برای مدیریت کلیک دکمه پاک کردن سبد خرید
function handleClearButtonClick() {
    cart = []; // سبد خرید را خالی می‌کنیم
    updateCartDisplay();
}

// تابع برای مدیریت کلیک دکمه تایید
function handleConfirmButtonClick() {
    const action = document.getElementById('productModal').getAttribute('data-action');
    const selectedProduct = document.getElementById('productSelect').value;
    if (selectedProduct) {
        modifyProductQuantity(selectedProduct, action);
        closeProductSelectionModal();
    }
}

// تابع برای مدیریت کلیک دکمه لغو
function handleCancelButtonClick() {
    closeProductSelectionModal();
}

// تابع برای بارگذاری فایل‌های HTML
function includeHTML(el, file) {
    fetch(file)
        .then(response => response.text())
        .then(data => {
            if (el.tagName.toLowerCase() === "head") {
                const headContent = document.createElement('div');
                headContent.innerHTML = data;

                headContent.querySelectorAll('link').forEach(element => {
                    document.head.appendChild(element);
                });

                headContent.querySelectorAll('script').forEach(element => {
                    const script = document.createElement('script');
                    script.src = element.src;
                    script.defer = true;
                    document.head.appendChild(script);
                });
            } else {
                el.innerHTML = data;
            }
        })
        .catch(err => console.error('Error loading file:', err));
}

document.addEventListener("DOMContentLoaded", function () {
    includeHTML(document.querySelector("head"), "/Fashion/toppe.html");
    includeHTML(document.querySelector("header"), "/Fashion/menuue.html");
    includeHTML(document.querySelector("footer"), "/Fashion/Footert.html");

    // استفاده از MutationObserver برای ثبت دکمه‌ها
    const observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            if (mutation.addedNodes.length) {
                registerCartButtons();
            }
        });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // ثبت دکمه‌های اضافه شده در بارگذاری اولیه
    registerCartButtons();
});
