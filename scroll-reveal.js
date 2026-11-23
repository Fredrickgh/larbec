/* ═══════════════════════════════════════════════════════════════════════
   SCROLL REVEAL ANIMATIONS
   scroll-reveal.js - Detects elements entering viewport and triggers animations
   ═══════════════════════════════════════════════════════════════════════ */

(function () {
    const revealElements = [];
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    function initScrollReveal() {
        const elements = document.querySelectorAll('[data-scroll-animation]');

        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const animation = entry.target.getAttribute('data-scroll-animation');
                        const delay = entry.target.getAttribute('data-scroll-delay') || '0';

                        entry.target.style.transitionDelay = delay + 'ms';
                        entry.target.classList.add('reveal-' + animation);
                        entry.target.classList.add('revealed');

                        // Unobserve after animation to save performance
                        observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);

            elements.forEach(el => {
                observer.observe(el);
            });
        } else {
            // Fallback for browsers without IntersectionObserver
            elements.forEach(el => {
                el.classList.add('reveal-' + el.getAttribute('data-scroll-animation'));
                el.classList.add('revealed');
            });
        }
    }

    // Run on page load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initScrollReveal);
    } else {
        initScrollReveal();
    }

    // Re-initialize if dynamic content is added
    window.reinitScrollReveal = function () {
        initScrollReveal();
    };

    // ─── BACK TO TOP BUTTON ───
    window.scrollToTop = function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    // Show/hide back to top button based on scroll position
    function updateBackToTopButton() {
        const backToTopBtn = document.getElementById('backToTop');
        if (!backToTopBtn) return;

        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    }

    // Update button visibility on scroll
    window.addEventListener('scroll', updateBackToTopButton);

    // Initialize button state on page load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', updateBackToTopButton);
    } else {
        updateBackToTopButton();
    }
})();
