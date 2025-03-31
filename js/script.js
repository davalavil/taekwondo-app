document.addEventListener('DOMContentLoaded', function() {

    // --- Lógica para mostrar/ocultar secciones de cinturón ---
    const beltButtons = document.querySelectorAll('.belt-nav-button');
    const beltSections = document.querySelectorAll('.belt-section');

    if (beltButtons.length > 0 && beltSections.length > 0) {
        function resetSectionsAndButtons() {
            beltSections.forEach(section => section.classList.remove('active-section'));
            beltButtons.forEach(button => button.classList.remove('active'));
        }

        beltButtons.forEach(button => {
            button.addEventListener('click', function(event) {
                event.preventDefault();
                const targetId = this.getAttribute('data-target');
                const targetSection = document.getElementById(targetId);

                if (targetSection) {
                     // Si ya está activo, no hacer nada (o podrías ocultarlo)
                    if (this.classList.contains('active')) {
                         // Opcional: Descomenta para ocultar si se hace clic de nuevo
                         // resetSectionsAndButtons();
                         // return;
                         return; // No hacer nada si ya está activo
                    }

                    resetSectionsAndButtons();
                    targetSection.classList.add('active-section');
                    this.classList.add('active');
                } else {
                    console.warn(`No se encontró la sección con el ID: ${targetId}`);
                }
            });
        });
         // Opcional: Mostrar una sección por defecto al cargar (ej: Amarillo)
         const defaultBeltButton = document.querySelector('.belt-nav-button.belt-yellow');
         if (defaultBeltButton) {
              defaultBeltButton.click(); // Simula clic para mostrar amarillo al inicio
         }
    }

    // --- Lógica para el Modal de Video ---
    const videoModal = document.getElementById('video-player-container');
    const videoPlayerContent = document.getElementById('video-player-content');
    const closeVideoButton = document.getElementById('close-video');
    const videoTriggers = document.querySelectorAll('.video-trigger');

    // Verificar si los elementos del modal existen
    if (videoModal && videoPlayerContent && closeVideoButton && videoTriggers.length > 0) {

        // Función para abrir el modal y cargar el video
        function openVideoModal(videoId) {
            // Construir el iframe de YouTube
            const iframeHtml = `<iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;
            // Insertar el iframe en el contenedor
            videoPlayerContent.innerHTML = iframeHtml;
            // Hacer visible el modal
            videoModal.classList.add('visible');
        }

        // Función para cerrar el modal y detener el video
        function closeVideoModal() {
            // Quitar la clase visible para ocultar con transición
            videoModal.classList.remove('visible');
            // Eliminar el contenido del iframe para detener el video
            // Un pequeño retraso puede asegurar que la transición de opacidad termine antes de quitar el iframe
            setTimeout(() => {
                 videoPlayerContent.innerHTML = '';
            }, 300); // 300ms coincide con la transición CSS
        }

        // Añadir evento de clic a cada botón que dispara un video
        videoTriggers.forEach(button => {
            button.addEventListener('click', function() {
                const videoId = this.getAttribute('data-video-id');
                if (videoId) {
                    openVideoModal(videoId);
                } else {
                    console.warn("Botón de video no tiene data-video-id");
                }
            });
        });

        // Añadir evento de clic al botón de cerrar
        closeVideoButton.addEventListener('click', closeVideoModal);

        // Añadir evento de clic al fondo del modal para cerrar (opcional)
        videoModal.addEventListener('click', function(event) {
            // Si el clic fue directamente sobre el fondo (container) y no sobre el contenido (content)
            if (event.target === videoModal) {
                closeVideoModal();
            }
        });

        // Cerrar con la tecla Escape (opcional)
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && videoModal.classList.contains('visible')) {
                closeVideoModal();
            }
        });

    } else {
         // Si estamos en una página sin modal o sin triggers, simplemente no hagas nada.
         // console.log("Elementos del modal de video no encontrados en esta página.");
    }

}); // Fin del DOMContentLoaded
