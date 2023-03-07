"use strict";

const burger = document.querySelector(".header__burger");
const menu = document.querySelector(".header__menu");
const menuLinks = document.querySelectorAll(".header__menu menu__link");

burger.addEventListener("click", function () {
    burger.classList.toggle("burger__active");
    menu.classList.toggle("menu__active");
    document.body.classList.toggle("lock");
});
menu.onclick = () => {
    burger.classList.remove("burger__active");
    menu.classList.remove("menu__active");
    document.body.classList.remove("lock");
};


const button = document.querySelectorAll(".button > .hover-circle");

button.forEach(item => {
    item.addEventListener("mousemove", function (e) {

        const x = e.offsetX - item.offsetLeft;
        const y = e.offsetY - item.offsetTop;

        item.style.setProperty('--x', x + 'px');
        item.style.setProperty('--y', y + 'px');
    });
})


const tabsBody = document.querySelectorAll(".tabs__body");
const tabsTitle = document.querySelectorAll(".tabs__title");

tabsTitle.forEach((item, index) => item.onclick = () => {
    for (let key of tabsBody) {
        if (key.classList.contains("tab-active")) {
            key.classList.remove("tab-active");
        }
    }
    tabsBody[index].classList.add("tab-active");
})


const menuLinksWrapper = document.querySelectorAll("[data-line-effect]");

menuLinksWrapper.length ? menuEffect() : null;

function menuEffect() {

    menuLinksWrapper.forEach(menuLinksWrapper => {
        const menuLinks = menuLinksWrapper.querySelectorAll('button, a');

        //speed
        const effectSpeed = menuLinksWrapper.dataset.lineEffect ? menuLinksWrapper.dataset.lineEffect : 200;

        menuLinks.length ? menuEffectItem(menuLinks, effectSpeed) : null;
    });

    function menuEffectItem(menuLinks, effectSpeed) {

        const effectTransition = `transition: transform ${effectSpeed}ms ease;`;
        const effectHover = `transform: translate3d(0px, 0%, 0px);`;
        const effectTop = `transform: translate3d(0px, -102%, 0px);`;
        const effectBottom = `transform: translate3d(0px, 102%, 0px);`;
        menuLinks.forEach(menuLink => {
            menuLink.insertAdjacentHTML('beforeend',
                `<span style="transform: translate3d(0px, 102%, 0px);" class="hover">
                    <span style="transform: translate3d(0px, -102%, 0px);" class="hover__text">
                         ${menuLink.textContent}
                    </span>
                </span>`
            );
            menuLink.onmouseenter = menuLink.onmouseleave = menuLinkActions;
        });

        function menuLinkActions(e) {
            const menuLink = e.target;
            const menuLinkItem = menuLink.querySelector(".hover");
            const menuLinkText = menuLink.querySelector(".hover__text");

            const menuLinkHeight = menuLink.offsetHeight / 2;

            const menuLinkPos = e.pageY - (menuLink.getBoundingClientRect().top + scrollY);


            if (e.type === 'mouseenter') {

                menuLinkItem.style.cssText = menuLinkPos > menuLinkHeight ? effectBottom : effectTop;
                menuLinkText.style.cssText = menuLinkPos > menuLinkHeight ? effectTop : effectBottom;

                setTimeout(() => {
                    menuLinkItem.style.cssText = effectHover + effectTransition;
                    menuLinkText.style.cssText = effectHover + effectTransition;
                }, 5);
            }

            if (e.type === 'mouseleave') {
                menuLinkItem.style.cssText = menuLinkPos > menuLinkHeight ? effectBottom + effectTransition : effectTop + effectTransition;
                menuLinkText.style.cssText = menuLinkPos > menuLinkHeight ? effectTop + effectTransition : effectBottom + effectTransition;
            }
        }
    }
}

document.addEventListener("DOMContentLoaded", function () {

    let formReq = document.querySelectorAll('[data-req]');
    const form = document.getElementById('form');
    form.addEventListener('submit', formSend);

    async function formSend(e) {
        e.preventDefault();

        let error = formValidate(form);

        let formData = new FormData(form);

        if (error === 0) {

            let loader = document.querySelector(".loader")
            loader.classList.add('_sending');

            let response = await fetch('sendmail.php', {
                method: "POST",
                body: formData
            });
            if (response.ok) {
                let result = await response.json();
                alert(result.message);
                formPreview.innerHTML = "";
                form.reset();
                loader.classList.remove('_sending');
            }
            else {
                alert("Error");
                loader.classList.remove('_sending');
            }
        }
    }

    function formValidate(form) {
        let error = 0;

        for (let index = 0; index < formReq.length; index++) {
            const input = formReq[index];
            formRemoveError(input);

            if (input.classList.contains('_tel')) {
                if (numberTest(input)) {
                    formAddError(input);
                    error++;
                }
            }
            if (input.value === '') {
                formAddError(input);
                error++;
            }

        }
        return error;
    }

    function formAddError(input) {
        input.parentElement.classList.add('_error');
        input.classList.add('_error');
    }

    function formRemoveError(input) {
        input.parentElement.classList.remove('_error');
        input.classList.remove('_error');
    }

    function numberTest(input) {
        return !/^([+]?[0-9\s-\(\)]{3,25})*$/.test(input.value);
    }

});

// ANIMATION------------------------------------------
// gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

// if (ScrollTrigger.isTouch !== 1) {

//     ScrollSmoother.create({
//         wrapper: '.wrapper',
//         content: '.content',
//         smooth: 1.5,
//         effects: true
//     })

//     let itemsR = gsap.utils.toArray('.about__me, .portfolio__img-bg')

//     itemsR.forEach(item => {
//         gsap.fromTo(item, { opacity: 0, x: -200 }, {
//             opacity: 1, x: 0,
//             scrollTrigger: {
//                 trigger: item,
//                 start: '-500',
//                 end: 'top',
//                 scrub: true
//             }
//         })
//     })

// }

// gsap.utils.toArray(".nav a").forEach(function (button, i) {
//     button.addEventListener("click", (e) => {
//         e.preventDefault();
//         let id = e.target.querySelectorAll("[href]");
//         smoother.scrollTo(id, true, "top top");
//     });
// });

// window.onload = (event) => {
//     console.log("page is fully loaded");

//     let urlHash = window.location.href.split("#")[1];

//     let scrollElem = document.querySelector("#" + urlHash);

//     console.log(scrollElem, urlHash);

//     if (urlHash && scrollElem) {
//         gsap.to(smoother, {
//             scrollTop: smoother.offset(scrollElem, "top top"),
//             duration: 1,
//             delay: 0.5
//         });
//     }
// };



