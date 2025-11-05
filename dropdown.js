/**
 * DROPDOWN MENU IMPLEMENTATION
 * 
 * Este módulo maneja la funcionalidad de los menús desplegables.
 * Características:
 * - Alternar visibilidad al hacer clic en el botón
 * - Cerrar dropdown al hacer clic fuera
 * - Reutilizable para múltiples dropdowns en la misma página
 */

// Función para inicializar todos los dropdowns
function initDropdowns() {
    // Seleccionar todos los dropdowns en la página
    const dropdowns = document.querySelectorAll('[data-dropdown]');
    
    // Iterar sobre cada dropdown y añadir event listeners
    dropdowns.forEach(dropdown => {
        const button = dropdown.querySelector('[data-dropdown-button]');
        
        // Toggle del dropdown al hacer clic en el botón
        button.addEventListener('click', (e) => {
            e.stopPropagation(); // Evitar que el clic se propague
            toggleDropdown(dropdown);
        });
    });

    // Cerrar todos los dropdowns al hacer clic fuera
    document.addEventListener('click', () => {
        closeAllDropdowns();
    });

    // Prevenir que clics dentro del dropdown lo cierren
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    });
}

// Función para alternar la visibilidad de un dropdown
function toggleDropdown(dropdown) {
    // Cerrar otros dropdowns primero
    const allDropdowns = document.querySelectorAll('[data-dropdown]');
    allDropdowns.forEach(otherDropdown => {
        if (otherDropdown !== dropdown) {
            otherDropdown.classList.remove('active');
        }
    });

    // Alternar el dropdown actual
    dropdown.classList.toggle('active');
}

// Función para cerrar todos los dropdowns
function closeAllDropdowns() {
    const dropdowns = document.querySelectorAll('[data-dropdown]');
    dropdowns.forEach(dropdown => {
        dropdown.classList.remove('active');
    });
}

// Manejar la tecla Escape para cerrar dropdowns
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeAllDropdowns();
    }
});

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initDropdowns);
