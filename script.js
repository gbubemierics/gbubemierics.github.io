
// ============================================
// GBUBEMI ERICS - PROFESSIONAL PORTFOLIO
// Interactive Website Functionality
// ============================================

document.addEventListener("DOMContentLoaded", () => {

    // DARK AND LIGHT MODE

    const themeToggle = document.getElementById("themeToggle");
    const root = document.documentElement;

    let savedTheme = "dark";

    try {
        savedTheme = localStorage.getItem("portfolioTheme") || "dark";
    } catch (error) {
        // Continue with the default theme.
    }

    function applyTheme(theme) {

        const isLight = theme === "light";

        root.setAttribute("data-theme", isLight ? "light" : "dark");

        themeToggle.innerHTML = isLight
            ? '<i class="fa-solid fa-moon" aria-hidden="true"></i>'
            : '<i class="fa-solid fa-sun" aria-hidden="true"></i>';

        themeToggle.setAttribute(
            "aria-label",
            isLight ? "Switch to dark mode" : "Switch to light mode"
        );

    }

    applyTheme(savedTheme);

    themeToggle.addEventListener("click", () => {

        const currentTheme = root.getAttribute("data-theme");

        const newTheme = currentTheme === "dark"
            ? "light"
            : "dark";

        applyTheme(newTheme);

        try {
            localStorage.setItem("portfolioTheme", newTheme);
        } catch (error) {
            // Theme still works without local storage.
        }

    });


    // MOBILE NAVIGATION

    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    function closeMenu() {

        navLinks.classList.remove("open");

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");

        menuToggle.innerHTML =
            '<i class="fa-solid fa-bars" aria-hidden="true"></i>';

    }

    menuToggle.addEventListener("click", () => {

        const isOpen = navLinks.classList.toggle("open");

        menuToggle.setAttribute("aria-expanded", String(isOpen));

        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation" : "Open navigation"
        );

        menuToggle.innerHTML = isOpen
            ? '<i class="fa-solid fa-xmark" aria-hidden="true"></i>'
            : '<i class="fa-solid fa-bars" aria-hidden="true"></i>';

    });

    navLinks.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", closeMenu);

    });

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {
            closeMenu();
        }

    });

    window.addEventListener("resize", () => {

        if (window.innerWidth > 768) {
            closeMenu();
        }

    });


    // INTERACTIVE PROJECT FILTERING

    const filterButtons =
        document.querySelectorAll(".filter-btn");

    const projectCards =
        document.querySelectorAll(".project-card");

    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            const selectedCategory = button.dataset.filter;

            filterButtons.forEach(item => {

                const selected = item === button;

                item.classList.toggle("active", selected);

                item.setAttribute("aria-pressed", String(selected));

            });

            projectCards.forEach(card => {

                const showCard =
                    selectedCategory === "all" ||
                    card.dataset.category === selectedCategory;

                card.hidden = !showCard;

            });

        });

    });


    // ACTIVE NAVIGATION LINK ON SCROLL

    const navigationLinks =
        document.querySelectorAll(".nav-links a");

    const sections = Array.from(navigationLinks)
        .map(link => document.querySelector(link.getAttribute("href")))
        .filter(Boolean);

    function updateNavigation() {

        let currentSection = sections[0]?.id;

        sections.forEach(section => {

            if (section.getBoundingClientRect().top <= 150) {

                currentSection = section.id;

            }

        });

        navigationLinks.forEach(link => {

            const isActive =
                link.getAttribute("href") === `#${currentSection}`;

            link.classList.toggle("active", isActive);

            if (isActive) {

                link.setAttribute("aria-current", "location");

            } else {

                link.removeAttribute("aria-current");

            }

        });

    }

    window.addEventListener(
        "scroll",
        updateNavigation,
        { passive: true }
    );

    updateNavigation();


    // AUTOMATIC FOOTER COPYRIGHT YEAR

    const currentYear = document.getElementById("currentYear");

    if (currentYear) {

        currentYear.textContent = new Date().getFullYear();

    }

});
