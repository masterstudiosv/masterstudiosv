document.addEventListener("DOMContentLoaded", function () {

    /* ==============================
       TOGGLE MENÚ MÓVIL
    ============================== */
    window.toggleMenu = function () {
        const menu = document.getElementById("mobileMenu");
        if (menu) {
            menu.classList.toggle("hidden");
        }
    };


    /* ==============================
       FUNCIONES MODALES
    ============================== */
    window.openModal = function (type) {
        const modal = document.getElementById(type + "Modal");
        if (modal) {
            modal.classList.remove("hidden");
            document.body.style.overflow = "hidden";
        }
    };

    window.closeModal = function (type) {
        const modal = document.getElementById(type + "Modal");
        if (modal) {
            modal.classList.add("hidden");
            document.body.style.overflow = "auto";
        }
    };


    /* ==============================
       SMOOTH SCROLL (NO BLOQUEA MODALES)
    ============================== */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {

            const targetId = this.getAttribute("href").substring(1);
            const target = document.getElementById(targetId);

            // ⚠️ Si es un modal, no hacer scroll
            if (targetId.endsWith("Modal")) {
                return;
            }

            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });


    /* ==============================
       ANIMACIÓN AL HACER SCROLL
    ============================== */
    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll(".service-card").forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(20px)";
        el.style.transition = "all 0.6s ease";
        observer.observe(el);
    });

});
// Función para abrir/cerrar menú móvil
    window.toggleMenu = function () {
        const menu = document.getElementById("mobileMenu");
        if (menu) {
            menu.classList.toggle("hidden");
        }
    };