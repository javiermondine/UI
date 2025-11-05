/**
 * IMAGE CAROUSEL IMPLEMENTATION
 * 
 * Este módulo maneja la funcionalidad del carrusel de imágenes.
 * Características:
 * - Navegación con botones anterior/siguiente
 * - Avance automático cada 5 segundos
 * - Indicadores clicables para saltar a una imagen específica
 * - Pausa del auto-avance al interactuar manualmente
 */

class ImageCarousel {
    constructor(carouselElement) {
        // Elementos del DOM
        this.carousel = carouselElement;
        this.track = this.carousel.querySelector('.carousel-track');
        this.slides = Array.from(this.track.children);
        this.nextButton = this.carousel.querySelector('[data-carousel-button="next"]');
        this.prevButton = this.carousel.querySelector('[data-carousel-button="prev"]');
        this.indicators = Array.from(this.carousel.querySelectorAll('.carousel-indicator'));
        
        // Estado del carrusel
        this.currentIndex = 0;
        this.autoPlayInterval = null;
        this.autoPlayDelay = 5000; // 5 segundos
        
        // Inicializar
        this.init();
    }

    init() {
        // Configurar event listeners
        this.setupEventListeners();
        
        // Iniciar auto-play
        this.startAutoPlay();
    }

    setupEventListeners() {
        // Botón siguiente
        this.nextButton.addEventListener('click', () => {
            this.nextSlide();
            this.resetAutoPlay(); // Reiniciar auto-play al interactuar
        });

        // Botón anterior
        this.prevButton.addEventListener('click', () => {
            this.prevSlide();
            this.resetAutoPlay();
        });

        // Indicadores
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                this.goToSlide(index);
                this.resetAutoPlay();
            });
        });

        // Pausar auto-play al pasar el mouse sobre el carrusel
        this.carousel.addEventListener('mouseenter', () => {
            this.stopAutoPlay();
        });

        // Reanudar auto-play al salir el mouse
        this.carousel.addEventListener('mouseleave', () => {
            this.startAutoPlay();
        });
    }

    // Navegar a la siguiente imagen
    nextSlide() {
        const nextIndex = (this.currentIndex + 1) % this.slides.length;
        this.goToSlide(nextIndex);
    }

    // Navegar a la imagen anterior
    prevSlide() {
        const prevIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
        this.goToSlide(prevIndex);
    }

    // Ir a una imagen específica
    goToSlide(targetIndex) {
        // Actualizar slide actual
        this.slides[this.currentIndex].classList.remove('current-slide');
        this.slides[targetIndex].classList.add('current-slide');

        // Actualizar indicador actual
        this.indicators[this.currentIndex].classList.remove('current-indicator');
        this.indicators[targetIndex].classList.add('current-indicator');

        // Actualizar índice
        this.currentIndex = targetIndex;
    }

    // Iniciar reproducción automática
    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, this.autoPlayDelay);
    }

    // Detener reproducción automática
    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }

    // Reiniciar reproducción automática
    resetAutoPlay() {
        this.stopAutoPlay();
        this.startAutoPlay();
    }
}

// Inicializar todos los carruseles en la página
function initCarousels() {
    const carousels = document.querySelectorAll('[data-carousel]');
    carousels.forEach(carousel => {
        new ImageCarousel(carousel);
    });
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initCarousels);
