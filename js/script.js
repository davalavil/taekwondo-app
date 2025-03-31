// Espera a que todo el contenido del HTML esté cargado antes de ejecutar el script
document.addEventListener('DOMContentLoaded', function() {

    // Selecciona todos los botones de navegación de cinturón
    const beltButtons = document.querySelectorAll('.belt-nav-button');
    // Selecciona todas las secciones de contenido de cinturón
    const beltSections = document.querySelectorAll('.belt-section');

    // Verifica si existen botones de cinturón en la página actual
    // Esto evita errores si el script se carga en otras páginas que no los tienen
    if (beltButtons.length > 0 && beltSections.length > 0) {

        // Función para ocultar todas las secciones y quitar el estado activo de los botones
        function resetSectionsAndButtons() {
            beltSections.forEach(section => {
                section.classList.remove('active-section'); // Oculta la sección
            });
            beltButtons.forEach(button => {
                button.classList.remove('active'); // Quita el estilo activo del botón
            });
        }

        // Añade un 'escuchador' de eventos de clic a cada botón de cinturón
        beltButtons.forEach(button => {
            button.addEventListener('click', function(event) {
                event.preventDefault(); // Previene el comportamiento por defecto del enlace (#)

                // Obtiene el ID de la sección objetivo del atributo 'data-target' del botón
                const targetId = this.getAttribute('data-target');
                // Selecciona la sección específica que corresponde a ese ID
                const targetSection = document.getElementById(targetId);

                // Si la sección objetivo existe...
                if (targetSection) {
                    // Primero, oculta todas las secciones y desactiva todos los botones
                    resetSectionsAndButtons();

                    // Luego, muestra la sección objetivo añadiendo la clase 'active-section'
                    targetSection.classList.add('active-section');

                    // Y finalmente, marca el botón clickeado como activo añadiendo la clase 'active'
                    this.classList.add('active');

                     // Opcional: Desplazar suavemente a la sección visible
                     // targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                     // Puede ser útil si las secciones son muy largas, pero con la animación fadeIn puede ser suficiente.
                } else {
                    console.warn(`No se encontró la sección con el ID: ${targetId}`); // Mensaje de advertencia si algo falla
                }
            });
        });

        // Opcional: Mostrar una sección por defecto al cargar la página (ej: amarillo)
        // const defaultButton = document.querySelector('.belt-nav-button.belt-yellow');
        // if (defaultButton) {
        //     defaultButton.click(); // Simula un clic en el botón amarillo al cargar
        // }

    } // Fin del if (beltButtons.length > 0)

}); // Fin del DOMContentLoaded
