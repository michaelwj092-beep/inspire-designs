document.addEventListener('DOMContentLoaded', () => {
    // 1. Brand Name / Logo
    const brandNameEl = document.getElementById('brand-name');
    if (brandNameEl) {
        if (CONFIG.logo) {
            // Use logo image
            const logoImg = document.createElement('img');
            logoImg.src = CONFIG.logo;
            logoImg.alt = CONFIG.brandName;
            logoImg.className = 'logo-img';
            brandNameEl.appendChild(logoImg);
        } else {
            // Fallback to text
            brandNameEl.textContent = CONFIG.brandName;
        }
        brandNameEl.href = "index.html"; // Default to home
    }

    // 2. Navigation
    const navList = document.getElementById('nav-list');
    if (navList && CONFIG.navigation) {
        CONFIG.navigation.forEach(link => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.textContent = link.text;
            a.href = link.href;
            li.appendChild(a);
            navList.appendChild(li);
        });
    }

    // 2.5 Mission Section
    if (CONFIG.mission) {
        setSafeText('mission-title', CONFIG.mission.title);
        setSafeText('mission-p1', CONFIG.mission.text_p1);
        setSafeText('mission-p2', CONFIG.mission.text_p2);
        setSafeText('mission-tagline', CONFIG.mission.tagline);
        setSafeText('mission-cta-head', CONFIG.mission.ctaHeadline);

        const missionBtn = document.getElementById('mission-btn');
        if (missionBtn) {
            missionBtn.textContent = CONFIG.mission.ctaButtonText;
            missionBtn.href = CONFIG.mission.ctaLink;
        }
    }

    // 6. About Section
    if (CONFIG.about) {
        setSafeText('about-title', CONFIG.about.title);
        setSafeText('about-subtitle', CONFIG.about.subtitle);
        setSafeText('about-text', CONFIG.about.text);

        // Add tagline if it exists
        if (CONFIG.about.tagline) {
            const aboutContent = document.querySelector('.about-content');
            if (aboutContent) {
                // Check if tagline element already exists
                let taglineEl = document.querySelector('.about-tagline');
                if (!taglineEl) {
                    taglineEl = document.createElement('p');
                    taglineEl.className = 'about-tagline';
                    // Insert after about-text
                    const aboutText = document.getElementById('about-text');
                    if (aboutText) {
                        aboutText.after(taglineEl);
                    }
                }
                taglineEl.textContent = CONFIG.about.tagline;
            }
        }
    }
    // 3. Hero Section
    if (CONFIG.hero) {
        setSafeText('hero-title', CONFIG.hero.title);
        setSafeText('hero-subtitle', CONFIG.hero.subtitle);

        // Hero Logo
        const heroLogoEl = document.getElementById('hero-logo');
        if (heroLogoEl && CONFIG.hero.showLogo && CONFIG.logo) {
            heroLogoEl.src = CONFIG.logo;
            heroLogoEl.style.display = 'block';
        }

        const ctaBtn = document.getElementById('hero-cta');
        if (ctaBtn) {
            ctaBtn.textContent = CONFIG.hero.ctaText;
            ctaBtn.href = CONFIG.hero.ctaLink;
        }
    }

    // 4. Services Calculator Section
    if (CONFIG.services) {
        setSafeText('services-title', CONFIG.services.title);
        setSafeText('services-subheadline', CONFIG.services.subheadline);
        setSafeText('services-subtitle', CONFIG.services.subtitle);
        setSafeText('services-disclaimer', CONFIG.services.disclaimer);
        setSafeText('total-label', CONFIG.services.totalLabel || "Total Cost");

        const servicesList = document.getElementById('services-list');
        const selectedListEl = document.getElementById('selected-items-list');
        const totalCostEl = document.getElementById('total-cost');

        let selectedServices = new Set();
        const allItems = CONFIG.services.items; // Define for easy access in closures

        if (servicesList && allItems) {
            allItems.forEach(item => {
                // Create Card
                const card = document.createElement('div');
                card.className = 'service-card';
                card.dataset.id = item.id;
                card.dataset.price = item.price;

                // Inner HTML
                card.innerHTML = `
                    <div class="service-info">
                        <span class="service-icon">${item.icon}</span>
                        <h3>${item.title}</h3>
                        <p>${item.description}</p>
                        ${item.note ? `<span class="service-note">${item.note}</span>` : ''}
                    </div>
                    <div class="service-price">
                        <span class="price-tag">${CONFIG.services.currencySymbol}${item.price}</span>
                        <span class="price-period">${CONFIG.services.period}</span>
                    </div>
                    <div class="checkbox-indicator"></div>
                `;

                // Click Handler
                card.addEventListener('click', () => {
                    // CHECK DEPENDENCY
                    if (item.dependency) {
                        const requiredItem = allItems.find(i => i.id === item.dependency);
                        if (requiredItem && !selectedServices.has(item.dependency)) {
                            // Visual Error Feedback
                            card.classList.add('dependency-error');
                            setTimeout(() => {
                                card.classList.remove('dependency-error');
                            }, 1000);

                            // Requested Prompt
                            alert(`Sermon Series Graphic must be selected to also select this plan.`);
                            return; // Stop execution
                        }
                    }

                    const isSelected = selectedServices.has(item.id);

                    if (isSelected) {
                        selectedServices.delete(item.id);
                        card.classList.remove('selected');

                        // Auto-deselect dependents? (Optional, but good UX)
                        // If I deselect Parent, should Child be deselected?
                        // Let's implement that for robustness.
                        const dependents = allItems.filter(i => i.dependency === item.id);
                        dependents.forEach(dep => {
                            if (selectedServices.has(dep.id)) {
                                selectedServices.delete(dep.id);
                                const depCard = document.querySelector(`.service-card[data-id="${dep.id}"]`);
                                if (depCard) depCard.classList.remove('selected');
                            }
                        });

                    } else {
                        selectedServices.add(item.id);
                        card.classList.add('selected');
                    }

                    updateTotal(selectedServices, CONFIG.services.items);
                });

                servicesList.appendChild(card);
            });
        }

        function updateTotal(selectedIds, allItems) {
            let total = 0;

            // Clear current list
            selectedListEl.innerHTML = '';

            if (selectedIds.size === 0) {
                selectedListEl.innerHTML = '<p style="font-style: italic; opacity: 0.5;">Select services to build your plan...</p>';
            }

            allItems.forEach(item => {
                if (selectedIds.has(item.id)) {
                    total += item.price;

                    // Add to summary list
                    const summaryItem = document.createElement('div');
                    summaryItem.className = 'summary-item';
                    summaryItem.innerHTML = `
                        <span>${item.title}</span>
                        <span>${CONFIG.services.currencySymbol}${item.price}</span>
                    `;
                    selectedListEl.appendChild(summaryItem);
                }
            });

            // Update Total Text
            totalCostEl.textContent = `${CONFIG.services.currencySymbol}${total}${CONFIG.services.period}`;
        }
    }

    // 5. Portfolio Section - Filterable Gallery
    if (CONFIG.portfolio) {
        setSafeText('portfolio-title', CONFIG.portfolio.title);
        setSafeText('portfolio-subtitle', CONFIG.portfolio.subtitle);

        const portfolioGrid = document.getElementById('portfolio-grid');
        const filterBtns = document.querySelectorAll('.filter-btn');

        // Collect all images with categories
        let allPortfolioItems = [];

        if (portfolioGrid && CONFIG.portfolio.categories) {
            // Build portfolio items from categories
            Object.keys(CONFIG.portfolio.categories).forEach(categoryKey => {
                const category = CONFIG.portfolio.categories[categoryKey];
                category.images.forEach((imagePath, index) => {
                    const item = document.createElement('div');
                    item.className = 'portfolio-item';
                    item.dataset.category = categoryKey;

                    const img = document.createElement('img');
                    img.src = imagePath;
                    img.alt = `${category.label} ${index + 1}`;
                    img.loading = 'lazy';

                    item.appendChild(img);
                    portfolioGrid.appendChild(item);

                    allPortfolioItems.push({ element: item, imagePath: imagePath });
                });
            });

            // Filter functionality
            filterBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    const filter = btn.dataset.filter;

                    // Update active button
                    filterBtns.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');

                    // Filter items
                    const items = document.querySelectorAll('.portfolio-item');
                    items.forEach(item => {
                        if (filter === 'all' || item.dataset.category === filter) {
                            item.classList.remove('hidden');
                        } else {
                            item.classList.add('hidden');
                        }
                    });
                });
            });

            // Lightbox functionality
            const lightbox = document.getElementById('lightbox');
            const lightboxImg = document.getElementById('lightbox-img');
            const lightboxClose = document.getElementById('lightbox-close');
            const lightboxPrev = document.getElementById('lightbox-prev');
            const lightboxNext = document.getElementById('lightbox-next');
            let currentImageIndex = 0;

            function openLightbox(index) {
                currentImageIndex = index;
                lightboxImg.src = allPortfolioItems[index].imagePath;
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            }

            function closeLightbox() {
                lightbox.classList.remove('active');
                document.body.style.overflow = '';
            }

            function showNextImage() {
                currentImageIndex = (currentImageIndex + 1) % allPortfolioItems.length;
                lightboxImg.src = allPortfolioItems[currentImageIndex].imagePath;
            }

            function showPrevImage() {
                currentImageIndex = (currentImageIndex - 1 + allPortfolioItems.length) % allPortfolioItems.length;
                lightboxImg.src = allPortfolioItems[currentImageIndex].imagePath;
            }

            // Click handlers
            allPortfolioItems.forEach((item, index) => {
                item.element.addEventListener('click', () => openLightbox(index));
            });

            if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
            if (lightboxPrev) lightboxPrev.addEventListener('click', showPrevImage);
            if (lightboxNext) lightboxNext.addEventListener('click', showNextImage);

            // Close on background click
            if (lightbox) {
                lightbox.addEventListener('click', (e) => {
                    if (e.target === lightbox) closeLightbox();
                });
            }

            // Keyboard navigation
            document.addEventListener('keydown', (e) => {
                if (!lightbox.classList.contains('active')) return;

                if (e.key === 'Escape') closeLightbox();
                if (e.key === 'ArrowRight') showNextImage();
                if (e.key === 'ArrowLeft') showPrevImage();
            });
        }
    }

    // 6. Contact Section
    if (CONFIG.contact) {
        setSafeText('contact-title', CONFIG.contact.title);
        setSafeText('contact-subtitle', CONFIG.contact.subtitle);

        const emailEl = document.getElementById('contact-email');
        if (emailEl) {
            emailEl.textContent = CONFIG.contact.email;
            emailEl.href = `mailto:${CONFIG.contact.email}`;
        }

        const phoneEl = document.getElementById('contact-phone');
        if (phoneEl) {
            phoneEl.textContent = CONFIG.contact.phone;
            phoneEl.href = `tel:${CONFIG.contact.phone.replace(/[^0-9]/g, '')}`;
        }

        const ctaBtn = document.getElementById('contact-cta');
        if (ctaBtn) {
            ctaBtn.textContent = CONFIG.contact.ctaText;
            ctaBtn.href = `mailto:${CONFIG.contact.email}`;
        }
    }

    // 7. Closing CTA Section
    if (CONFIG.closingCta) {
        setSafeText('closing-text', CONFIG.closingCta.text);

        const closingBtn = document.getElementById('closing-btn');
        if (closingBtn) {
            closingBtn.textContent = CONFIG.closingCta.btnText;
            closingBtn.href = CONFIG.closingCta.btnLink;
        }
    }

    // 8. Footer
    if (CONFIG.footer) {
        setSafeText('footer-text', CONFIG.footer.text);
    }

    // 8. Background Slideshow (REMOVED)
    // Code for scroll-controlled background slideshow has been removed as part of the style reset.
});

// Helper to safely set text content if element exists
function setSafeText(id, text) {
    const el = document.getElementById(id);
    if (el) {
        el.textContent = text;
    }
}
