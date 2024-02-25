import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
    const { pathname } = useLocation();
    useEffect(() => {
        var header = document.querySelector("header");
        var scrollTop = document.querySelector("#top");
        var menu = document.querySelector("#offcanvasNavbar");
        var menuBtn = document.querySelector(".open-close-nav");
        var nav = document.querySelector("header nav");

        window.scrollTo(0, 0);

        window.addEventListener('scroll', function () {
            var sc = window.scrollY;
            if (sc >= 400) {
                scrollTop.style.display = "block";
            } else {
                scrollTop.style.display = "none";
            }
        })

        if (menu.classList.contains("show")) {
            menuBtn.click();
        }

        if (pathname === "/") {
            header.classList.remove("fixed");
            nav.classList.add("navbar-dark");
        } else {
            if (!header.classList.contains("fixed")) {
                header.classList.add("fixed");
            }
            if (nav.classList.contains("navbar-dark")) {
                nav.classList.remove("navbar-dark")
            }
        }
    }, [pathname]);
    return null;
}