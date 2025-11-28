/**
 * Premium Salla Theme - Main JavaScript
 * Handles core functionality and initialization
 */

import Salla from '@salla.sa/twilight';

class PremiumTheme {
    constructor() {
        this.init();
    }

    init() {
        this.initSalla();
        this.initBackToTop();
        this.initStickyHeader();
        this.initLazyLoading();
        this.initAnimations();
        this.initNewsletterForm();
        this.setupEventListeners();
    }

    /**
     * Initialize Salla Twilight
     */
    initSalla() {
        Salla.onReady(() => {
            console.log('Salla Twilight is ready');
            
            // Listen to cart updates
            Salla.event.cart.updated((response) => {
                this.updateCartCount(response.data.count);
            });

            // Listen to wishlist updates
            Salla.event.wishlist.updated((response) => {
                console.log('Wishlist updated:', response);
            });
        });
    }

    /**
     * Update cart count in header
     */
    updateCartCount(count) {
        const cartCountElements = document.querySelectorAll('[data-cart-count]');
        cartCountElements.forEach(el => {
            el.textContent = count;
        });
    }

    /**
     * Initialize Back to Top button
     */
    initBackToTop() {
        const backToTopBtn = document.getElementById('back-to-top');
        if (!backToTopBtn) return;

        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.remove('opacity-0', 'invisible');
                backToTopBtn.classList.add('opacity-100', 'visible');
            } else {
                backToTopBtn.classList.add('opacity-0', 'invisible');
                backToTopBtn.classList.remove('opacity-100', 'visible');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    /**
     * Initialize Sticky Header
     */
    initStickyHeader() {
        const header = document.getElementById('site-header');
        if (!header) return;

        const headerStyle = header.dataset.headerStyle;
        if (headerStyle !== 'sticky') return;

        let lastScroll = 0;
        const headerHeight = header.offsetHeight;

        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;

            if (currentScroll > headerHeight) {
                header.classList.add('shadow-lg');
            } else {
                header.classList.remove('shadow-lg');
            }

            // Hide header on scroll down, show on scroll up
            if (currentScroll > lastScroll && currentScroll > headerHeight * 2) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }

            lastScroll = currentScroll;
        });
    }

    /**
     * Initialize Lazy Loading for images
     */
    initLazyLoading() {
        if ('loading' in HTMLImageElement.prototype) {
            // Browser supports native lazy loading
            const images = document.querySelectorAll('img[loading="lazy"]');
            images.forEach(img => {
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                }
            });
        } else {
            // Fallback to Intersection Observer
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                        }
                        img.classList.remove('lazy');
                        observer.unobserve(img);
                    }
                });
            });

            const images = document.querySelectorAll('img.lazy');
            images.forEach(img => imageObserver.observe(img));
        }
    }

    /**
     * Initialize Animations
     */
    initAnimations() {
        // Check if animations are enabled
        const animationsEnabled = document.body.dataset.animationsEnabled !== 'false';
        if (!animationsEnabled) return;

        // Animate elements on scroll
        const animateOnScroll = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fadeIn');
                }
            });
        }, {
            threshold: 0.1
        });

        const animatedElements = document.querySelectorAll('[data-animate]');
        animatedElements.forEach(el => animateOnScroll.observe(el));
    }

    /**
     * Initialize Newsletter Form
     */
    initNewsletterForm() {
        const form = document.getElementById('newsletter-form');
        if (!form) return;

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const email = form.querySelector('input[type="email"]').value;
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;

            try {
                submitBtn.disabled = true;
                submitBtn.textContent = 'جاري الإرسال...';

                // Send to Salla newsletter API
                const response = await fetch('/api/newsletter/subscribe', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email })
                });

                if (response.ok) {
                    this.showNotification('تم الاشتراك بنجاح!', 'success');
                    form.reset();
                } else {
                    throw new Error('Subscription failed');
                }
            } catch (error) {
                this.showNotification('حدث خطأ، يرجى المحاولة مرة أخرى', 'error');
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }
        });
    }

    /**
     * Setup Event Listeners
     */
    setupEventListeners() {
        // Handle ESC key to close modals
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeAllModals();
            }
        });

        // Prevent body scroll when modal is open
        const modals = document.querySelectorAll('[role="dialog"]');
        modals.forEach(modal => {
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.attributeName === 'aria-hidden') {
                        const isHidden = modal.getAttribute('aria-hidden') === 'true';
                        document.body.style.overflow = isHidden ? '' : 'hidden';
                    }
                });
            });
            observer.observe(modal, { attributes: true });
        });
    }

    /**
     * Close all open modals
     */
    closeAllModals() {
        // Close cart drawer
        const cartDrawer = document.querySelector('[data-cart-drawer]');
        if (cartDrawer && cartDrawer.getAttribute('aria-hidden') === 'false') {
            document.querySelector('[data-cart-drawer-close]')?.click();
        }

        // Close search modal
        const searchModal = document.querySelector('[data-search-modal]');
        if (searchModal && searchModal.getAttribute('aria-hidden') === 'false') {
            document.querySelector('[data-search-modal-close]')?.click();
        }

        // Close mobile menu
        const mobileMenu = document.querySelector('[data-mobile-menu]');
        if (mobileMenu && mobileMenu.getAttribute('aria-hidden') === 'false') {
            document.querySelector('[data-mobile-menu-close]')?.click();
        }
    }

    /**
     * Show notification
     */
    showNotification(message, type = 'info') {
        // Use Salla notification if available
        if (window.salla && window.salla.notify) {
            window.salla.notify[type](message);
        } else {
            // Fallback to alert
            alert(message);
        }
    }

    /**
     * Utility: Debounce function
     */
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    /**
     * Utility: Throttle function
     */
    throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
}

// Initialize theme when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new PremiumTheme();
    });
} else {
    new PremiumTheme();
}

// Export for use in other modules
export default PremiumTheme;
