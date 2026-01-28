// MASONRY COLUMN PARALLAX SYSTEM
// Organizes portfolio images into 4 vertical columns with full coverage and parallax scrolling

(function () {
    'use strict';

    const parallaxContainer = document.getElementById('parallax-bg');
    if (!parallaxContainer) return;

    // Get portfolio images from config - combine all categories
    let portfolioImages = [];
    if (CONFIG.portfolio && CONFIG.portfolio.categories) {
        Object.keys(CONFIG.portfolio.categories).forEach(categoryKey => {
            const category = CONFIG.portfolio.categories[categoryKey];
            portfolioImages = portfolioImages.concat(category.images);
        });
    }
    if (portfolioImages.length === 0) return;

    // Configuration
    const isMobile = window.innerWidth <= 768;
    const NUM_COLUMNS = isMobile ? 2 : 4;
    const GAP = 15; // Gap between images in px
    const COLUMN_SPEEDS = isMobile ? [0.3, 0.6] : [0.3, 0.7, 0.4, 0.8]; // Different speeds for each column

    // Calculate page height to determine how many images we need
    const pageHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight
    );

    // Create columns (2 on mobile, 4 on desktop)
    const columns = [];
    const columnWidth = 100 / NUM_COLUMNS;
    for (let i = 0; i < NUM_COLUMNS; i++) {
        const column = document.createElement('div');
        column.className = 'parallax-column';
        column.style.cssText = `
            position: absolute;
            top: 0;
            left: ${i * columnWidth}%;
            width: ${columnWidth}%;
            padding: 0 ${GAP / 2}px;
            will-change: transform;
        `;
        column.dataset.speed = COLUMN_SPEEDS[i];
        parallaxContainer.appendChild(column);
        columns.push(column);
    }

    // Distribute images across columns and repeat to fill height
    let imageIndex = 0;
    const imagesPerColumn = Math.ceil(pageHeight / 300); // Estimate ~300px per image

    columns.forEach((column, colIndex) => {
        let currentHeight = 0;

        // Fill column with images until we exceed page height
        while (currentHeight < pageHeight * 1.5) { // 1.5x for parallax buffer
            const imagePath = portfolioImages[imageIndex % portfolioImages.length];

            const imgWrapper = document.createElement('div');
            imgWrapper.className = 'parallax-image-wrapper';
            imgWrapper.style.cssText = `
                width: 100%;
                margin-bottom: ${GAP}px;
                overflow: hidden;
                border-radius: 8px;
            `;

            const img = document.createElement('img');
            img.src = imagePath;
            img.className = 'parallax-column-image';
            img.alt = '';
            img.loading = 'lazy'; // Lazy load images for better performance
            img.style.cssText = `
                width: 100%;
                height: auto;
                display: block;
                opacity: 1;
                filter: none;
                transition: opacity 0.3s ease, filter 0.3s ease;
            `;

            imgWrapper.appendChild(img);
            column.appendChild(imgWrapper);

            // Estimate height (will be corrected on load)
            currentHeight += 300;
            imageIndex++;
        }
    });

    // Parallax scroll effect
    let ticking = false;

    function updateParallax() {
        const scrolled = window.pageYOffset;

        columns.forEach(column => {
            const speed = parseFloat(column.dataset.speed);
            const yPos = -(scrolled * speed);
            // Use translate3d for GPU acceleration and smoother scrolling
            column.style.transform = `translate3d(0, ${yPos}px, 0)`;
        });

        ticking = false;
    }

    function requestTick() {
        if (!ticking) {
            window.requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }

    window.addEventListener('scroll', requestTick);

    // Initial position
    updateParallax();

    // Optional: Hover effect on images - subtle brightness increase
    parallaxContainer.addEventListener('mouseover', (e) => {
        if (e.target.classList.contains('parallax-column-image')) {
            e.target.style.opacity = '1';
            e.target.style.filter = 'brightness(1.1)';
        }
    });

    parallaxContainer.addEventListener('mouseout', (e) => {
        if (e.target.classList.contains('parallax-column-image')) {
            e.target.style.opacity = '1';
            e.target.style.filter = 'none';
        }
    });
})();
