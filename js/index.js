// Cargar logos automáticamente desde la carpeta clientes/
        // Lista todos los archivos SVG que tengas en la carpeta clientes/
        const logoFiles = [
            'cli1.svg', 'cli2.svg', 'cli3.svg', 'cli4.svg', 
            'cli5.svg', 'cli6.svg', 'cli7.svg', 'cli8.svg'
            // Agrega aquí cualquier logo nuevo que subas a clientes/
            // Ejemplo: 'cli8.svg', 'cli9.svg', 'cli10.svg'
        ];

        // Si duplicas los logos para hacer un carrusel infinito
        logoFiles.forEach(file => {
            const img = document.createElement('img');
            img.src = `clientes/${file}`;
            img.alt = file;
            img.className = 'logo-item';

            logoTrack.appendChild(img);
        });

    });
        
        const logoTrack = document.getElementById('logoTrack');
        
        // Duplicar los logos 3 veces para crear el efecto de loop infinito
        for (let i = 0; i < 3; i++) {
            logoFiles.forEach((logo, index) => {
                const logoItem = document.createElement('div');
                logoItem.className = 'logo-item';
                logoItem.innerHTML = `<img src="clientes/${logo}" alt="Cliente ${index + 1}" onerror="this.parentElement.style.display='none'">`;
                logoTrack.appendChild(logoItem);
            });
        }

        // Crear partículas en el hero
        const particlesContainer = document.getElementById('particles');
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 15 + 's';
            particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
            particlesContainer.appendChild(particle);
        }

        // Typing animation
        const phrases = [
            'Con Un Sitio Web Profesional',
            'Que Atrae Más Clientes',
            'Y Aumenta Tus Ventas',
            'Con Diseño Moderno'
        ];
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        const typingElement = document.getElementById('typingText');

        function typeText() {
            const currentPhrase = phrases[phraseIndex];
            
            if (isDeleting) {
                typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
            }

            if (!isDeleting && charIndex === currentPhrase.length) {
                setTimeout(() => isDeleting = true, 2000);
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
            }

            const typingSpeed = isDeleting ? 50 : 100;
            setTimeout(typeText, typingSpeed);
        }

        typeText();

        // Toggle Mobile Menu
        function toggleMenu() {
            const menu = document.getElementById('mobileMenu');
            menu.classList.toggle('hidden');
        }

        // Modal Functions
        function openModal(modalId) {
            document.getElementById(modalId).classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        }

        function closeModal(modalId) {
            document.getElementById(modalId).classList.add('hidden');
            document.body.style.overflow = 'auto';
        }

        // Contact Form Handler
        const form = document.getElementById('contactForm');
        const loadingMessage = document.getElementById('loadingMessage');
        const submitButton = form.querySelector('button[type="submit"]');

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            loadingMessage.classList.remove('hidden');
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Enviando...';

            const formData = new FormData(form);

            try {
                const response = await fetch("https://api.web3forms.com/submit", {
                    method: "POST",
                    body: formData
                });

                const data = await response.json();

                if (response.ok) {
                    alert("✅ ¡Excelente! Tu solicitud se envió correctamente. Te contactaremos en menos de 24 horas.");
                    form.reset();
                } else {
                    alert("❌ Error: " + data.message);
                }
            } catch (error) {
                alert("⚠️ Error al enviar. Por favor intenta de nuevo o contáctanos por WhatsApp.");
            } finally {
                loadingMessage.classList.add('hidden');
                submitButton.disabled = false;
                submitButton.innerHTML = '<i class="fas fa-paper-plane mr-2"></i> Solicitar Mi Sitio Web Ahora';
            }
        });

        // Smooth Scroll
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href !== '#' && !href.includes('Modal')) {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                        document.getElementById('mobileMenu').classList.add('hidden');
                    }
                }
            });
        });

        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        document.querySelectorAll('.service-card, .feature-box, .pricing-card, .portfolio-item').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'all 0.6s ease';
            observer.observe(el);
        });

        // Event listeners for modal links
        document.addEventListener('DOMContentLoaded', function () {
            document.querySelectorAll('a[href="#politicas"]').forEach(link => {
                link.addEventListener('click', function (e) {
                    e.preventDefault();
                    openModal('politicasModal');
                });
            });

            document.querySelectorAll('a[href="#terminos"]').forEach(link => {
                link.addEventListener('click', function (e) {
                    e.preventDefault();
                    openModal('terminosModal');
                });
            });

            document.querySelectorAll('a[href="#cookies"]').forEach(link => {
                link.addEventListener('click', function (e) {
                    e.preventDefault();
                    openModal('cookiesModal');
                });
            });

            ['politicasModal', 'terminosModal', 'cookiesModal'].forEach(modalId => {
                document.getElementById(modalId).addEventListener('click', function (e) {
                    if (e.target === this) {
                        closeModal(modalId);
                    }
                });
            });
        });
