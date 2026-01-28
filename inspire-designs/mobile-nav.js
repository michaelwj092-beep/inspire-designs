// MOBILE NAVIGATION TOGGLE
(function () {
    'use strict';

    // Create mobile menu toggle button
    const navbar = document.querySelector('.navbar-container');
    if (!navbar) return;

    // Create hamburger button
    const hamburger = document.createElement('button');
    hamburger.className = 'mobile-menu-toggle';
    hamburger.setAttribute('aria-label', 'Toggle mobile menu');
    hamburger.innerHTML = `
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
    `;
    navbar.appendChild(hamburger);

    // Get navigation links container
    const navLinks = document.querySelector('.nav-links');
    if (!navLinks) return;

    // Toggle menu function
    function toggleMenu() {
        const isOpen = navLinks.classList.contains('mobile-menu-open');

        if (isOpen) {
            navLinks.classList.remove('mobile-menu-open');
            hamburger.classList.remove('active');
            document.body.style.overflow = '';
        } else {
            navLinks.classList.add('mobile-menu-open');
            hamburger.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    // Close menu when clicking a link
    function closeMenu() {
        navLinks.classList.remove('mobile-menu-open');
        hamburger.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Event listeners
    hamburger.addEventListener('click', toggleMenu);

    // Close menu when clicking a navigation link
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target) && navLinks.classList.contains('mobile-menu-open')) {
            closeMenu();
        }
    });
})();
