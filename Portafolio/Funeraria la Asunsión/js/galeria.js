// Galería - Carruseles, Modal y Lightbox

// Variables globales
let currentCategory = '';
let currentImageIndex = 0;
let currentImages = [];

// Scroll del carrusel
function scrollCarousel(category, direction) {
    const carousel = document.getElementById(`carousel-${category}`);
    const scrollAmount = 370; // ancho de imagen + gap
    carousel.scrollLeft += scrollAmount * direction;
}

// Abrir modal "Ver más"
function openModal(category) {
    currentCategory = category;
    const modal = document.getElementById('modal-gallery');
    const modalTitle = document.getElementById('modal-title');
    const modalGrid = document.getElementById('modal-grid');
    
    // Títulos por categoría
    const titles = {
        'vehiculos': 'Flota de Vehículos',
        'funerales': 'Funerales',
        'capillas': 'Capillas de Velación',
        'ataudes': 'Ataúdes',
        'arreglos': 'Arreglos Florales',
        'personal': 'Nuestro Personal'
    };
    
    modalTitle.textContent = titles[category];
    
    // Obtener imágenes del carrusel
    const carousel = document.getElementById(`carousel-${category}`);
    const images = carousel.querySelectorAll('img');
    
    // Limpiar grid anterior
    modalGrid.innerHTML = '';
    
    // Agregar imágenes al modal
    images.forEach((img, index) => {
        const imgClone = img.cloneNode(true);
        imgClone.onclick = function() {
            openLightbox(category, index);
        };
        modalGrid.appendChild(imgClone);
    });
    
    // Mostrar modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Cerrar modal
function closeModal() {
    const modal = document.getElementById('modal-gallery');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Abrir lightbox
function openLightbox(category, imageIndex) {
    currentCategory = category;
    currentImageIndex = imageIndex;
    
    // Obtener todas las imágenes de la categoría
    const carousel = document.getElementById(`carousel-${category}`);
    const images = carousel.querySelectorAll('img');
    currentImages = Array.from(images).map(img => img.src);
    
    // Mostrar imagen en lightbox
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCurrent = document.getElementById('lightbox-current');
    const lightboxTotal = document.getElementById('lightbox-total');
    
    lightboxImg.src = currentImages[currentImageIndex];
    lightboxCurrent.textContent = currentImageIndex + 1;
    lightboxTotal.textContent = currentImages.length;
    
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Cerrar lightbox
function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Cambiar imagen en lightbox
function changeLightboxImage(direction) {
    currentImageIndex += direction;
    
    // Loop circular
    if (currentImageIndex < 0) {
        currentImageIndex = currentImages.length - 1;
    } else if (currentImageIndex >= currentImages.length) {
        currentImageIndex = 0;
    }
    
    // Actualizar imagen
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCurrent = document.getElementById('lightbox-current');
    
    lightboxImg.style.opacity = '0';
    
    setTimeout(() => {
        lightboxImg.src = currentImages[currentImageIndex];
        lightboxCurrent.textContent = currentImageIndex + 1;
        lightboxImg.style.opacity = '1';
    }, 150);
}

// Cerrar modal/lightbox con ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
        closeLightbox();
    }
    
    // Navegación con flechas en lightbox
    if (document.getElementById('lightbox').classList.contains('active')) {
        if (e.key === 'ArrowLeft') {
            changeLightboxImage(-1);
        } else if (e.key === 'ArrowRight') {
            changeLightboxImage(1);
        }
    }
});

// Cerrar modal al hacer clic fuera
document.getElementById('modal-gallery').addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
});

// Cerrar lightbox al hacer clic fuera
document.getElementById('lightbox').addEventListener('click', function(e) {
    if (e.target === this) {
        closeLightbox();
    }
});

// Transición suave para lightbox img
document.getElementById('lightbox-img').style.transition = 'opacity 0.15s ease';

// Animación de entrada para las categorías
document.addEventListener('DOMContentLoaded', function() {
    const categories = document.querySelectorAll('.gallery-category');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    categories.forEach((category, index) => {
        category.style.opacity = '0';
        category.style.transform = 'translateY(30px)';
        category.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(category);
    });
});

// Prevenir comportamiento por defecto en imágenes
document.querySelectorAll('.carousel img').forEach(img => {
    img.addEventListener('dragstart', (e) => e.preventDefault());
});