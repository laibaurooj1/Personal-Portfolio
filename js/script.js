document.addEventListener("DOMContentLoaded", () => {
    /* ---------- Mobile menu ---------- */
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");
    const navOverlay = document.querySelector(".nav-overlay");

    function closeMenu() {
        navLinks.classList.remove("active");
        navOverlay.classList.remove("active");
        const icon = menuToggle.querySelector("i");
        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");
    }

    menuToggle.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("active");
        navOverlay.classList.toggle("active", isOpen);
        const icon = menuToggle.querySelector("i");
        icon.classList.toggle("fa-bars", !isOpen);
        icon.classList.toggle("fa-times", isOpen);
    });

    navOverlay.addEventListener("click", closeMenu);

    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", closeMenu);
    });

    /* ---------- Typed role text ---------- */
    const roles = [
        "WEB DESIGNER",
        "PYTHON DATA ANALYST",
        "FRONTEND DEVELOPER"
    ];
    const typedEl = document.getElementById("typed-role");
    let roleIndex = 0, charIndex = 0, deleting = false;

    function typeLoop() {
        if (!typedEl) return;
        const current = roles[roleIndex];
        if (!deleting) {
            charIndex++;
            typedEl.textContent = current.slice(0, charIndex);
            if (charIndex === current.length) {
                deleting = true;
                setTimeout(typeLoop, 1400);
                return;
            }
        } else {
            charIndex--;
            typedEl.textContent = current.slice(0, charIndex);
            if (charIndex === 0) {
                deleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
            }
        }
        setTimeout(typeLoop, deleting ? 40 : 80);
    }
    typeLoop();

    /* ---------- Scroll reveal ---------- */
    const revealEls = document.querySelectorAll(".reveal");
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });
    revealEls.forEach(el => revealObserver.observe(el));

    /* ---------- Animate skill bars when visible ---------- */
    const bars = document.querySelectorAll(".progress-bar");
    const barObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.width = entry.target.dataset.width + "%";
                barObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.4 });
    bars.forEach(bar => barObserver.observe(bar));

    /* ---------- Active nav link on scroll ---------- */
    const sections = document.querySelectorAll("section[id]");
    const navAnchors = document.querySelectorAll(".nav-links a");

    function onScrollSpy() {
        let current = sections[0].id;
        const scrollPos = window.scrollY + 140;
        sections.forEach(sec => {
            if (scrollPos >= sec.offsetTop) current = sec.id;
        });
        navAnchors.forEach(a => {
            a.classList.toggle("active", a.getAttribute("href") === "#" + current);
        });
    }
    window.addEventListener("scroll", onScrollSpy);
    onScrollSpy();

    /* ---------- Back to top ---------- */
    const backToTop = document.querySelector(".back-to-top");
    window.addEventListener("scroll", () => {
        backToTop.classList.toggle("show", window.scrollY > 500);
    });
    backToTop.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
});
