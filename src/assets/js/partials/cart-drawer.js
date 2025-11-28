/**
 * Cart Drawer Component
 * Handles cart drawer functionality
 */

import Salla from '@salla.sa/twilight';

class CartDrawer {
    constructor() {
        this.drawer = document.querySelector('[data-cart-drawer]');
        this.overlay = document.querySelector('[data-cart-drawer-overlay]');
        this.triggers = document.querySelectorAll('[data-cart-trigger]');
        this.closeButtons = document.querySelectorAll('[data-cart-drawer-close]');
        
        if (!this.drawer) return;
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initSallaEvents();
    }

    setupEventListeners() {
        // Open drawer
        this.triggers.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                this.open();
            });
        });

        // Close drawer
        this.closeButtons.forEach(button => {
            button.addEventListener('click', () => this.close());
        });

        // Close on overlay click
        if (this.overlay) {
            this.overlay.addEventListener('click', () => this.close());
        }

        // Quantity controls
        this.drawer.addEventListener('click', (e) => {
            const target = e.target.closest('[data-action]');
            if (!target) return;

            const action = target.dataset.action;
            const itemId = target.dataset.itemId;

            switch (action) {
                case 'increase':
                    this.updateQuantity(itemId, 1);
                    break;
                case 'decrease':
                    this.updateQuantity(itemId, -1);
                    break;
                case 'remove':
                    this.removeItem(itemId);
                    break;
            }
        });
    }

    initSallaEvents() {
        // Listen to cart updates
        Salla.event.cart.updated((response) => {
            this.updateDrawer(response.data);
        });

        // Listen to item added
        Salla.event.cart.itemAdded((response) => {
            this.open();
            this.updateDrawer(response.data);
        });

        // Listen to item removed
        Salla.event.cart.itemDeleted((response) => {
            this.updateDrawer(response.data);
        });
    }

    open() {
        this.drawer.classList.remove('translate-x-full');
        this.drawer.setAttribute('aria-hidden', 'false');
        
        if (this.overlay) {
            this.overlay.classList.remove('opacity-0', 'invisible');
            this.overlay.classList.add('opacity-100', 'visible');
            this.overlay.setAttribute('aria-hidden', 'false');
        }

        document.body.style.overflow = 'hidden';
    }

    close() {
        this.drawer.classList.add('translate-x-full');
        this.drawer.setAttribute('aria-hidden', 'true');
        
        if (this.overlay) {
            this.overlay.classList.add('opacity-0', 'invisible');
            this.overlay.classList.remove('opacity-100', 'visible');
            this.overlay.setAttribute('aria-hidden', 'true');
        }

        document.body.style.overflow = '';
    }

    async updateQuantity(itemId, change) {
        try {
            const itemElement = this.drawer.querySelector(`[data-item-id="${itemId}"]`);
            const quantityElement = itemElement?.querySelector('[data-quantity]');
            
            if (!quantityElement) return;

            const currentQty = parseInt(quantityElement.textContent);
            const newQty = currentQty + change;

            if (newQty < 1) {
                this.removeItem(itemId);
                return;
            }

            // Update via Salla API
            await Salla.cart.updateItem(itemId, newQty);
            
        } catch (error) {
            console.error('Error updating quantity:', error);
            this.showError('حدث خطأ أثناء تحديث الكمية');
        }
    }

    async removeItem(itemId) {
        try {
            const confirmed = confirm('هل أنت متأكد من حذف هذا المنتج؟');
            if (!confirmed) return;

            // Remove via Salla API
            await Salla.cart.deleteItem(itemId);
            
            // Remove element from DOM
            const itemElement = this.drawer.querySelector(`[data-item-id="${itemId}"]`);
            if (itemElement) {
                itemElement.style.opacity = '0';
                setTimeout(() => itemElement.remove(), 300);
            }
            
        } catch (error) {
            console.error('Error removing item:', error);
            this.showError('حدث خطأ أثناء حذف المنتج');
        }
    }

    updateDrawer(cartData) {
        // Update cart count
        const countElements = this.drawer.querySelectorAll('[data-cart-count]');
        countElements.forEach(el => {
            el.textContent = cartData.count || 0;
        });

        // Update subtotal
        const subtotalElement = this.drawer.querySelector('[data-cart-subtotal]');
        if (subtotalElement) {
            subtotalElement.textContent = `${cartData.subtotal || 0} ر.س`;
        }

        // Show/hide empty state
        const emptyState = this.drawer.querySelector('[data-cart-empty]');
        const itemsContainer = this.drawer.querySelector('[data-cart-items]');
        const footer = this.drawer.querySelector('[data-cart-footer]');

        if (cartData.count === 0) {
            emptyState?.style.setProperty('display', 'block');
            itemsContainer?.style.setProperty('display', 'none');
            footer?.style.setProperty('display', 'none');
        } else {
            emptyState?.style.setProperty('display', 'none');
            itemsContainer?.style.setProperty('display', 'block');
            footer?.style.setProperty('display', 'block');
        }
    }

    showError(message) {
        if (window.salla && window.salla.notify) {
            window.salla.notify.error(message);
        } else {
            alert(message);
        }
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new CartDrawer();
    });
} else {
    new CartDrawer();
}

export default CartDrawer;
