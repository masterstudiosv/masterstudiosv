// Nosotros.js - Animaciones y contador de estadísticas

document.addEventListener('DOMContentLoaded', function() {
    
    // Sección de estadísticas y números
    const statsSection = document.querySelector('.estadisticas-section');
    const statNumbers = document.querySelectorAll('.stat-number[data-target]');
    let animated = false;

    function animateStats() {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const addPlus = stat.getAttribute('data-plus') === 'true'; // Solo para "Familias Atendidas"
            const duration = 2000; // Duración 2 segundos
            const increment = target / (duration / 16); // Aproximadamente 60 FPS
            let current = 0;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    stat.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    stat.textContent = addPlus ? target + "+" : target;
                }
            };

            updateCounter();
        });
    }

    // Observer para activar animación cuando la sección sea visible
    const observerOptions = { threshold: 0.5 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                animateStats();
                animated = true;
            }
        });
    }, observerOptions);

    if (statsSection) observer.observe(statsSection);

    // Animación de fade-in para otros elementos
    const fadeElements = document.querySelectorAll('.valor-card, .porque-item, .historia-content, .historia-image');
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.2 });

    fadeElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        fadeObserver.observe(el);
    });

    // Smooth scroll para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    // Parallax suave en el hero
    const hero = document.querySelector('.nosotros-hero');
    const heroBackground = document.querySelector('.hero-background');
    if (hero && heroBackground) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
        });
    }

    // Animación de entrada para el hero
    const heroContent = document.querySelector('.hero-content-wrapper');
    if (heroContent) {
        setTimeout(() => {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 300);
    }
});
