function includeHTML(el, file) {
    fetch(file)
        .then(response => response.text())
        .then(data => {
            if (el.tagName.toLowerCase() === "head") {
                // ایجاد عناصر <link> و <script> برای اضافه کردن به <head>
                const headContent = document.createElement('div');
                headContent.innerHTML = data;

                // افزودن <link> ها
                headContent.querySelectorAll('link').forEach(element => {
                    document.head.appendChild(element);
                });

                // افزودن <script> ها
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
    includeHTML(document.querySelector("head"), "/fashion-template/Fashion/toppe.html");
    includeHTML(document.querySelector("header"), "/fashion-template/Fashion/menuue.html");
    includeHTML(document.querySelector("footer"), "/fashion-template/Fashion/Footert.html");
});
