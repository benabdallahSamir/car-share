document.addEventListener('DOMContentLoaded', function () {
    // Ensure the hero section fills the viewport
    function adjustHeroHeight() {
        const header = document.querySelector('header');
        const hero = document.querySelector('.hero');

        if (header && hero) {
            const headerHeight = header.offsetHeight;
            const windowHeight = window.innerHeight;
            hero.style.minHeight = `${windowHeight - headerHeight}px`;
        }
    }

    // Call on load and resize
    adjustHeroHeight();
    window.addEventListener('resize', adjustHeroHeight);

    // Date picker initialization
    const startDateInput = document.getElementById('start-date');
    const endDateInput = document.getElementById('end-date');

    if (startDateInput && endDateInput) {
        // Simple date picker functionality
        startDateInput.addEventListener('focus', function () {
            this.type = 'date';
        });

        startDateInput.addEventListener('blur', function () {
            if (!this.value) {
                this.type = 'text';
            }
        });

        endDateInput.addEventListener('focus', function () {
            this.type = 'date';
        });

        endDateInput.addEventListener('blur', function () {
            if (!this.value) {
                this.type = 'text';
            }
        });
    }

    // Search form submission
    const searchForm = document.querySelector('.search-form');
    if (searchForm) {
        const searchButton = searchForm.querySelector('.btn-search');

        searchButton.addEventListener('click', function (e) {
            e.preventDefault();

            const addressInput = searchForm.querySelector('input[placeholder="Adresse précise, gare, métro..."]');
            const startDate = startDateInput ? startDateInput.value : '';
            const endDate = endDateInput ? endDateInput.value : '';

            if (!addressInput.value) {
                alert('Veuillez entrer une adresse');
                return;
            }

            if (!startDate) {
                alert('Veuillez sélectionner une date de début');
                return;
            }

            if (!endDate) {
                alert('Veuillez sélectionner une date de fin');
                return;
            }

            // Here you would normally send the search request to the server
            console.log('Searching for cars at:', addressInput.value);
            console.log('From:', startDate, 'To:', endDate);

            // For demo purposes, just show an alert
            alert(`Recherche de voitures à ${addressInput.value} du ${startDate} au ${endDate}`);
        });
    }

    // Reserve buttons
    const reserveButtons = document.querySelectorAll('.btn-reserve');
    reserveButtons.forEach(button => {
        button.addEventListener('click', function () {
            const carName = this.closest('.car-card').querySelector('h3').textContent;
            alert(`Vous allez réserver une ${carName}. Redirection vers la page de réservation...`);
        });
    });

    // Mobile menu toggle (for responsive design)
    function createMobileMenu() {
        const header = document.querySelector('header');
        if (!header || document.querySelector('.mobile-menu-btn')) return;

        const mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.classList.add('mobile-menu-btn');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';

        const nav = document.querySelector('nav');
        if (nav) {
            header.querySelector('.container').insertBefore(mobileMenuBtn, nav);

            mobileMenuBtn.addEventListener('click', function () {
                nav.querySelector('ul').classList.toggle('show');
            });
        }
    }

    // Only create mobile menu if screen width is below 768px
    if (window.innerWidth < 768) {
        createMobileMenu();
    }

    // Window resize event
    window.addEventListener('resize', function () {
        if (window.innerWidth < 768) {
            if (!document.querySelector('.mobile-menu-btn')) {
                createMobileMenu();
            }
        }
    });
});
