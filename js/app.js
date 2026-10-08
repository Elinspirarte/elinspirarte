document.addEventListener('DOMContentLoaded', () => {
    // 1. Establecer el año actual en el footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // 2. Menú móvil
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    mobileBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileBtn.innerHTML = navLinks.classList.contains('active') ? '&times;' : '&#9776;';
    });

    // Cerrar menú al hacer clic en un enlace (móvil)
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileBtn.innerHTML = '&#9776;';
        });
    });

    // 3. Cargar datos de la galería
    const galleryGrid = document.getElementById('gallery-grid');
    
    // Variables para el Modal
    const modal = document.getElementById('craft-modal');
    const closeBtn = document.querySelector('.close-btn');
    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    const modalTech = document.getElementById('modal-tech');
    const modalDesc = document.getElementById('modal-desc');

    // Función para renderizar la galería
    const renderGallery = (items) => {
        galleryGrid.innerHTML = '';
        
        items.forEach(item => {
            // Crear el elemento de la tarjeta
            const card = document.createElement('div');
            card.className = 'gallery-item';
            
            card.innerHTML = `
                <div class="gallery-img-wrapper">
                    <img src="${item.imagen}" alt="${item.titulo}" class="gallery-img">
                </div>
                <div class="gallery-info">
                    <h3>${item.titulo}</h3>
                    <p>${item.tecnica}</p>
                </div>
            `;
            
            // Evento para abrir el modal
            card.addEventListener('click', () => openModal(item));
            
            galleryGrid.appendChild(card);
        });
    };

    // Función para abrir el modal
    const openModal = (item) => {
        modalImg.src = item.imagen;
        modalImg.alt = item.titulo;
        modalTitle.textContent = item.titulo;
        modalTech.textContent = item.tecnica;
        modalDesc.textContent = item.descripcion;
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevenir scroll al abrir modal
    };

    // Cerrar modal
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    // Cerrar modal al hacer clic fuera del contenido
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Fetch de los datos (simulado con fetch local)
    fetch('data/artesanias.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar los datos');
            }
            return response.json();
        })
        .then(data => {
            renderGallery(data);
        })
        .catch(error => {
            console.error('Error:', error);
            galleryGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center;">No se pudieron cargar las artesanías en este momento.</p>';
        });
});
