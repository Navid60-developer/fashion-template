// Start Menu
function openNav() {
    document.getElementById("myNav").style.width = "100%";
}

function closeNav() {
    document.getElementById("myNav").style.width = "0%";
}
// End Menu
// start carosal
document.addEventListener('DOMContentLoaded', function () {
    var swiper = new Swiper('.swiper-container', {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        // direction: 'rtl',
        breakpoints: {
            768: {
                slidesPerView: 5,
            }
        }
    });
});
// document.addEventListener("DOMContentLoaded", function () {
//     if (document.querySelector(".swiper-container").swiper) {
//         console.log("Swiper is already initialized.");
//         return; // اگر مقداردهی شده، دوباره اجرا نشه
//     }

//     var swiper = new Swiper(".swiper-container", {
//         slidesPerView: 1,
//         spaceBetween: 20,
//         loop: true,
//         autoplay: {
//             delay: 2500,
//             disableOnInteraction: false,
//         },
//         pagination: {
//             el: ".swiper-pagination",
//             clickable: true,
//         },
//         breakpoints: {
//             768: {
//                 slidesPerView: 5,
//             }
//         }
//     });

//     console.log("Swiper initialized:", swiper);
// });


// End carosal
// Start footer
function toggleCategory(element) {
    var ul = element.nextElementSibling;
    var categoor = element.querySelector('.spancate');
    var arrow = element.querySelector('.arrow');
    var isOpen = ul.classList.toggle('open');
    arrow.style.transform = isOpen ? 'rotate(90deg)' : 'rotate(0deg)';
    arrow.style.color = isOpen ? 'blue' : 'gold';
    categoor.style.backgroundColor = isOpen ? 'blue' : 'unset';
    categoor.style.padding = isOpen ? '7px' : 'unset';
}
// End footer
//Start index
document.addEventListener('DOMContentLoaded', function () {
    var tooltipBtn_1 = document.getElementById("tooltipBtnMoreIndex_1");
    var tooltipBtnLess_1 = document.getElementById("tooltipBtnLessIndex_1");
    var tooltip_1 = document.getElementById("IdDiv_tooltipIndex_1");
    var DivP3_1 = document.getElementById("IdTooltipDivP3_1");
    var tooltipBtn_2 = document.getElementById("tooltipBtnMoreIndex_2");
    var tooltipBtnLess_2 = document.getElementById("tooltipBtnLessIndex_2");
    var tooltip_2 = document.getElementById("IdDiv_tooltipIndex_2");
    var DivP3_2 = document.getElementById("IdTooltipDivP3_2");

    tooltipBtn_1.addEventListener("click", function () {
        if (tooltip_1.style.display === "none" || tooltip_1.style.display === "") {
            tooltip_1.style.display = "block";
            DivP3_1.style.display = "none";
            var rect = tooltipBtn_1.getBoundingClientRect();
            var topPosition = rect.top + window.scrollY + tooltipBtn_1.offsetHeight + 10;
            // if (topPosition > 500) {
            //     topPosition = 500;
            // }
            tooltip_1.style.top = topPosition + "px";
            tooltip_1.style.left = (rect.left + window.scrollX + (tooltipBtn_1.offsetWidth / 2) - (tooltip_1.offsetWidth / 2)) + "px";
        } else {
            tooltip_1.style.display = "none";
            DivP3_1.style.display = "block";
        }
    });
    tooltipBtnLess_1.addEventListener("click", function () {
        if (tooltip_1.style.display === "none" || tooltip_1.style.display === "") {
            tooltip_1.style.display = "block";
            var rect = tooltipBtnLess_1.getBoundingClientRect();
            var topPosition = rect.top + window.scrollY + tooltipBtnLess_1.offsetHeight + 10;
            // if (topPosition > 500) {
            //     topPosition = 500;
            // }
            tooltip_1.style.top = topPosition + "px";
            tooltip_1.style.left = (rect.left + window.scrollX + (tooltipBtnLess_1.offsetWidth / 2) - (tooltip_1.offsetWidth / 2)) + "px";
        } else {
            tooltip_1.style.display = "none";
            DivP3_1.style.display = "block";
        }
    });
    tooltipBtn_2.addEventListener("click", function () {
        if (tooltip_2.style.display === "none" || tooltip_2.style.display === "") {
            tooltip_2.style.display = "block";
            DivP3_2.style.display = "none";
            var rect = tooltipBtn_2.getBoundingClientRect();
            var topPosition = rect.top + window.scrollY + tooltipBtn_2.offsetHeight + 10;
            // if (topPosition > 500) {
            //     topPosition = 500;
            // }
            tooltip_2.style.top = topPosition + "px";
            tooltip_2.style.left = (rect.left + window.scrollX + (tooltipBtn_2.offsetWidth / 2) - (tooltip_2.offsetWidth / 2)) + "px";
        } else {
            tooltip_2.style.display = "none";
            DivP3_2.style.display = "block";
        }
    });
    tooltipBtnLess_2.addEventListener("click", function () {
        if (tooltip_2.style.display === "none" || tooltip_2.style.display === "") {
            tooltip_2.style.display = "block";
            var rect = tooltipBtnLess_2.getBoundingClientRect();
            var topPosition = rect.top + window.scrollY + tooltipBtnLess_2.offsetHeight + 10;
            // if (topPosition > 500) {
            //     topPosition = 500;
            // }
            tooltip_2.style.top = topPosition + "px";
            tooltip_2.style.left = (rect.left + window.scrollX + (tooltipBtnLess_2.offsetWidth / 2) - (tooltip_2.offsetWidth / 2)) + "px";
        } else {
            tooltip_2.style.display = "none";
            DivP3_2.style.display = "block";
        }
    });

    //   window.addEventListener("click", function(event) {
    //       if (!tooltipBtn.contains(event.target) && !tooltip.contains(event.target)) {
    //           tooltip.style.display = "none";
    //           DivP3_1.style.display="none";
    //       }
    //   });
});

//Start Mega Menu

// END Mega Menu

//End index
