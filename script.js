// Initialiser Vanta.js (fond globe)
        if (typeof VANTA !== 'undefined') {
            VANTA.GLOBE({
                el: "#vanta-bg",
                mouseControls: true,
                touchControls: true,
                gyroControls: false,
                minHeight: 200.00,
                minWidth: 200.00,
                scale: 1.00,
                scaleMobile: 1.00,
                color: 0x667eea,
                backgroundColor: 0x0,
                size: 0.8
            });
        }

        // Initialiser les animations AOS
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 800,
                easing: 'ease-in-out',
                once: true
            });
        }

        // Script pour le menu mobile
        document.addEventListener('DOMContentLoaded', function() {
            const mobileMenuButton = document.getElementById('mobile-menu-button');
            const mobileMenuClose = document.getElementById('mobile-menu-close');
            const mobileMenuBackdrop = document.getElementById('mobile-menu-backdrop');
            const mobileMenu = document.getElementById('mobile-menu');
            const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');

            // Fonction pour ouvrir le menu
            function openMobileMenu() {
                mobileMenuBackdrop.classList.add('open');
                mobileMenu.classList.add('open');
                document.body.style.overflow = 'hidden';
            }

            // Fonction pour fermer le menu
            function closeMobileMenu() {
                mobileMenuBackdrop.classList.remove('open');
                mobileMenu.classList.remove('open');
                document.body.style.overflow = '';
            }

            // Event listeners
            if (mobileMenuButton) {
                mobileMenuButton.addEventListener('click', openMobileMenu);
            }

            if (mobileMenuClose) {
                mobileMenuClose.addEventListener('click', closeMobileMenu);
            }

            // Fermer le menu si on clique sur le backdrop
            if (mobileMenuBackdrop) {
                mobileMenuBackdrop.addEventListener('click', function(e) {
                    if (e.target === mobileMenuBackdrop) {
                        closeMobileMenu();
                    }
                });
            }

            // Fermer le menu si on clique sur un lien
            mobileMenuLinks.forEach(link => {
                link.addEventListener('click', closeMobileMenu);
            });

            // Initialiser les icônes Feather
            if (typeof feather !== 'undefined') {
                feather.replace();
            }

            // Smooth scrolling pour les ancres
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                });
            });
        });