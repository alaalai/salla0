/**
 * Mobile Menu Component
 * Handles mobile navigation menu
 */

class MobileMenu {
    constructor() {
        this.menu = document.querySelector('[data-mobile-menu]');
        this.overlay = document.querySelector('[data-mobile-menu-overlay]');
        this.triggers = document.querySelectorAll('[data-mobile-menu-trigger]');
        this.closeButtons = document.querySelectorAll('[data-mobile-menu-close]');
        this.toggleButtons = document.querySelectorAll('[data-mobile-menu-toggle]');
        
        if (!this.menu) return;
        
        this.init();
    }

    init() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Open menu
        this.triggers.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                this.open();
            });
        });

        // Close menu
        this.closeButtons.forEach(button => {
            button.addEventListener('click', () => this.close());
        });

        // Close on overlay click
        if (this.overlay) {
            this.overlay.addEventListener('click', () => this.close());
        }

        // Toggle submenus
        this.toggleButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleSubmenu(button);
            });
        });

        // Close on link click (optional)
        const menuLinks = this.menu.querySelectorAll('a:not([data-mobile-menu-toggle])');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                // Close menu after a short delay to allow navigation
                setTimeout(() => this.close(), 200);
            });
        });
    }

    open() {
        this.menu.classList.remove('translate-x-full');
        this.menu.setAttribute('aria-hidden', 'false');
        
        if (this.overlay) {
            this.overlay.classList.remove('opacity-0', 'invisible');
            this.overlay.classList.add('opacity-100', 'visible');
            this.overlay.setAttribute('aria-hidden', 'false');
        }

        document.body.style.overflow = 'hidden';
    }

    close() {
        this.menu.classList.add('translate-x-full');
        this.menu.setAttribute('aria-hidden', 'true');
        
        if (this.overlay) {
            this.overlay.classList.add('opacity-0', 'invisible');
            this.overlay.classList.remove('opacity-100', 'visible');
            this.overlay.setAttribute('aria-hidden', 'true');
        }

        document.body.style.overflow = '';
        
        // Close all submenus
        this.closeAllSubmenus();
    }

    toggleSubmenu(button) {
        const submenuId = button.dataset.mobileMenuToggle;
        const submenu = this.menu.querySelector(`[data-mobile-submenu="${submenuId}"]`);
        const icon = button.querySelector('svg');
        
        if (!submenu) return;

        const isOpen = !submenu.classList.contains('hidden');

        if (isOpen) {
            // Close submenu
            submenu.classList.add('hidden');
            icon?.classList.remove('rotate-180');
        } else {
            // Close other submenus first
            this.closeAllSubmenus();
            
            // Open this submenu
            submenu.classList.remove('hidden');
            icon?.classList.add('rotate-180');
        }
    }

    closeAllSubmenus() {
        const submenus = this.menu.querySelectorAll('[data-mobile-submenu]');
        const icons = this.menu.querySelectorAll('[data-mobile-menu-toggle] svg');
        
        submenus.forEach(submenu => {
            submenu.classList.add('hidden');
        });
        
        icons.forEach(icon => {
            icon.classList.remove('rotate-180');
        });
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new MobileMenu();
    });
} else {
    new MobileMenu();
}

export default MobileMenu;
