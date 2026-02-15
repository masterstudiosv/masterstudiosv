// Carrusel

    const slides = document.querySelectorAll('.slide');
    const next = document.querySelector('.next');
    const prev = document.querySelector('.prev');
    let index = 0;

    function showSlide(i) {
        if (i >= slides.length) index = 0;
        if (i < 0) index = slides.length - 1;
        document.querySelector('.carousel-container').style.transform =
            `translateX(-${index * 100}%)`;
    }

    next.addEventListener('click', () => {
        index++;
        showSlide(index);
    });

    prev.addEventListener('click', () => {
        index--;
        showSlide(index);
    });

    // Automático cada 9 segundos
    setInterval(() => {
        index++;
        showSlide(index);
    }, 9000);

function showInfo(service) {
            const messages = {
                emergencia: 'Servicio de Emergencia disponible 24/7. Contacta al: +503 1234-5678',
                asistencia: 'Planes de Asistencia Familiar con facilidades de pago. Consulta nuestras opciones.',
                proteccion: 'Protección Familiar: Asegura el futuro de tu familia. Planes desde $X mensuales.'
            };
            alert(messages[service]);
        }

        function showAllServices() {
            alert('Aquí se mostrarían todos los servicios disponibles');
        }

        // Manejo del formulario
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                nombre: document.getElementById('nombre').value,
                apellido: document.getElementById('apellido').value,
                correo: document.getElementById('correo').value,
                telefono: document.getElementById('telefono').value,
                motivo: document.getElementById('motivo').value,
                mensaje: document.getElementById('mensaje').value
            };

            // Aquí puedes agregar la lógica para enviar el formulario a tu servidor
            console.log('Datos del formulario:', formData);
            
            alert('✓ ¡Gracias por contactarnos! Nos pondremos en contacto contigo lo antes posible.');
            this.reset();
        });

        // Manejo de carga de imágenes
        document.getElementById('imageInput').addEventListener('change', function(e) {
            const gallery = document.getElementById('galleryGrid');
            const files = e.target.files;
            
            // Limpiar placeholders si es la primera vez
            const hasPlaceholders = gallery.querySelector('.upload-placeholder');
            if (hasPlaceholders) {
                gallery.innerHTML = '';
            }
            
            for (let file of files) {
                if (file.type.startsWith('image/')) {
                    const reader = new FileReader();
                    
                    reader.onload = function(event) {
                        const galleryItem = document.createElement('div');
                        galleryItem.className = 'gallery-item';
                        
                        const img = document.createElement('img');
                        img.src = event.target.result;
                        img.alt = 'Imagen de localidad';
                        
                        galleryItem.appendChild(img);
                        gallery.appendChild(galleryItem);
                    };
                    
                    reader.readAsDataURL(file);
                }
            }
        });

        // Animación de entrada para elementos
        window.addEventListener('load', function() {
            const elements = document.querySelectorAll('.map-section, .form-section, .gallery-item, .whatsapp-section');
            elements.forEach((el, index) => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(20px)';
                el.style.transition = 'opacity 0.6s, transform 0.6s';
                
                setTimeout(() => {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, index * 100);
            });
        });