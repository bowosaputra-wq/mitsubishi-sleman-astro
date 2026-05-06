// ============================================
// Mitsubishi Sleman Web – Main Script
// Domain: https://mitsubishi-sleman.online
// ============================================

// Mobile Menu Toggle & Dropdown
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const dropdowns = document.querySelectorAll('.nav-dropdown');

    // Hamburger
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = navLinks.classList.toggle('active');
            hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
                dropdowns.forEach(d => d.classList.remove('active'));
            }
        });
    }

    // Dropdown toggle (mobile)
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a');
        if (link) {
            link.addEventListener('click', (e) => {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    dropdown.classList.toggle('active');
                }
            });
        }
    });

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                const offset = 80; // header height
                const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top, behavior: 'smooth' });
                // Close mobile nav if open
                if (navLinks) navLinks.classList.remove('active');
            }
        });
    });

    // Header scroll effect
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
            } else {
                header.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
            }
        });
    }

    // Animate elements on scroll (Intersection Observer)
    const animateEls = document.querySelectorAll('.car-card, .info-box, .testimonial-card, .product-card');
    if ('IntersectionObserver' in window && animateEls.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        animateEls.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            observer.observe(el);
        });
    }

    // Promo Slider
    const promoSlider = document.getElementById('promoSlider');
    if (promoSlider) {
        const slidesContainer = promoSlider.querySelector('.promo-slides');
        const slides = promoSlider.querySelectorAll('.promo-slide');
        const arrowLeft = document.getElementById('promoArrowLeft');
        const arrowRight = document.getElementById('promoArrowRight');
        const dotsContainer = document.getElementById('promoDots');
        
        if (slides.length > 1) {
            let currentIndex = 0;
            let autoPlayInterval;
            const DOT_COUNT = 5000;

            // Create dots
            slides.forEach((_, index) => {
                const dot = document.createElement('button');
                dot.className = 'promo-dot' + (index === 0 ? ' active' : '');
                dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
                dot.addEventListener('click', () => goToSlide(index));
                dotsContainer.appendChild(dot);
            });
            const dots = dotsContainer.querySelectorAll('.promo-dot');

            function updateDots() {
                dots.forEach((dot, index) => {
                    dot.classList.toggle('active', index === currentIndex);
                });
            }

            function goToSlide(index) {
                currentIndex = index;
                if (currentIndex >= slides.length) currentIndex = 0;
                if (currentIndex < 0) currentIndex = slides.length - 1;
                slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
                updateDots();
            }

            function nextSlide() {
                goToSlide(currentIndex + 1);
            }

            function prevSlide() {
                goToSlide(currentIndex - 1);
            }

            function startAutoPlay() {
                autoPlayInterval = setInterval(nextSlide, DOT_COUNT);
            }

            function stopAutoPlay() {
                clearInterval(autoPlayInterval);
            }

            // Arrow navigation
            if (arrowLeft) arrowLeft.addEventListener('click', () => { prevSlide(); stopAutoPlay(); startAutoPlay(); });
            if (arrowRight) arrowRight.addEventListener('click', () => { nextSlide(); stopAutoPlay(); startAutoPlay(); });

            // Pause on hover
            promoSlider.addEventListener('mouseenter', stopAutoPlay);
            promoSlider.addEventListener('mouseleave', startAutoPlay);

            // Touch/swipe support
            let touchStartX = 0;
            let touchEndX = 0;
            promoSlider.addEventListener('touchstart', (e) => { touchStartX = e.changedTouches[0].screenX; });
            promoSlider.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                if (touchStartX - touchEndX > 50) nextSlide();
                if (touchEndX - touchStartX > 50) prevSlide();
            });

            // Init
            startAutoPlay();
        }
    }
});
