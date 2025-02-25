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
    console.log('Cart updated:', cart);
}

// تابع برای به‌روزرسانی نمایش سبد خرید
function updateCartDisplay() {
    let itemCountElement = document.querySelector('.item-count');
    let totalPriceElement = document.querySelector('.total-price');
    if (!itemCountElement || !totalPriceElement) {
        console.error('Cart display elements not found');
        return;
    }
    
    let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    let totalPrice = cart.reduce((sum, item) => sum + item.quantity * item.price, 0);

    itemCountElement.innerText = totalItems;
    totalPriceElement.innerText = `$${totalPrice.toFixed(2)}`;
}

// تابع برای افزایش یا کاهش تعداد محصول
function modifyProductQuantity(productName, action) {
    let product = cart.find(item => item.name === productName);
    if (!product) {
        console.error('Product not found in cart:', productName);
        return;
    }

    if (action === 'increase') {
        product.quantity += 1;
    } else if (action === 'decrease' && product.quantity > 0) {
        product.quantity -= 1;
        if (product.quantity === 0) {
            cart = cart.filter(item => item.name !== productName);
        }
    }
    updateCartDisplay();
    console.log('Cart modified:', cart);
}

// تابع برای مدیریت کلیک دکمه "Add to Cart"
function handleAddToCartClick(event) {
    const button = event.target;
    const productName = button.getAttribute('data-product-name');
    let productPrice = parseFloat(button.getAttribute('data-product-price'));

    console.log('Product Name:', productName);
    console.log('Raw Price:', button.getAttribute('data-product-price'));
    console.log('Parsed Price:', productPrice);

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
    console.log('Cart buttons registered');
}

// تابع برای بارگذاری فایل‌های HTML
function includeHTML(el, file) {
    if (!el) {
        console.error('Element not found for including HTML:', file);
        return;
    }
    fetch(file)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            el.innerHTML = data;
        })
        .catch(err => console.error('Error loading file:', file, err));
}

document.addEventListener("DOMContentLoaded", function () {
    let basePath = window.location.pathname.includes("/fashion-template/") ? "/fashion-template/Fashion/" : "/";
    includeHTML(document.querySelector("head"), basePath + "toppe.html");
    includeHTML(document.querySelector("header"), basePath + "menuue.html");
    includeHTML(document.querySelector("footer"), basePath + "Footert.html");

    const observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            if (mutation.addedNodes.length) {
                registerCartButtons();
            }
        });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    registerCartButtons();
    console.log('Page loaded and cart buttons initialized');
});


// تابع برای بارگذاری فایل‌های HTML
// function includeHTML(el, file) {
//     fetch(file)
//         .then(response => response.text())
//         .then(data => {
//             if (el.tagName.toLowerCase() === "head") {
//                 const headContent = document.createElement('div');
//                 headContent.innerHTML = data;

//                 headContent.querySelectorAll('link').forEach(element => {
//                     document.head.appendChild(element);
//                 });

//                 headContent.querySelectorAll('script').forEach(element => {
//                     const script = document.createElement('script');
//                     script.src = element.src;
//                     script.defer = true;
//                     document.head.appendChild(script);
//                 });
//             } else {
//                 el.innerHTML = data;
//             }
//         })
//         .catch(err => console.error('Error loading file:', err));
// }

// // document.addEventListener("DOMContentLoaded", function () {
// //     // let basePath = window.location.pathname.includes("/fashion-template/") ? "/fashion-template/Fashion/" : "/Fashion/";
// //     // let basePath = window.location.origin.includes("github.io") ? "/fashion-template/Fashion/" : "/Fashion/";
// //     // let basePath = window.location.hostname.includes("github.io") ? "/fashion-template/Fashion/" : "/";

// //     // includeHTML(document.querySelector("head"), basePath + "toppe.html");
// //     // includeHTML(document.querySelector("header"), basePath + "menuue.html");
// //     // includeHTML(document.querySelector("footer"), basePath + "Footert.html");
    
// //     // includeHTML(document.querySelector("head"), "/fashion-template/Fashion/toppe.html");
// //     // includeHTML(document.querySelector("header"), "/fashion-template/Fashion/menuue.html");
// //     // includeHTML(document.querySelector("footer"), "/fashion-template/Fashion/Footert.html");
// //     includeHTML(document.querySelector("header"), location.origin + "/toppe.html");
// //     includeHTML(document.querySelector("header"), location.origin + "/menuue.html");
// //     includeHTML(document.querySelector("header"), location.origin + "/Footert.html");
// document.addEventListener("DOMContentLoaded", function () {
//     let basePath = window.location.pathname.includes("/fashion-template/") ? "/fashion-template/Fashion/" : "/";

//     includeHTML(document.querySelector("head"), basePath + "toppe.html");
//     includeHTML(document.querySelector("header"), basePath + "menuue.html");
//     includeHTML(document.querySelector("footer"), basePath + "Footert.html");




//     // استفاده از MutationObserver برای ثبت دکمه‌ها
//     const observer = new MutationObserver(function (mutations) {
//         mutations.forEach(function (mutation) {
//             if (mutation.addedNodes.length) {
//                 registerCartButtons();
//             }
//         });
//     });

//     observer.observe(document.body, { childList: true, subtree: true });

//     // ثبت دکمه‌های اضافه شده در بارگذاری اولیه
//     registerCartButtons();
// });
