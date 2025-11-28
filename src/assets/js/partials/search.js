/**
 * Search Modal Component
 * Handles search functionality with live results
 */

import Salla from '@salla.sa/twilight';

class SearchModal {
    constructor() {
        this.modal = document.querySelector('[data-search-modal]');
        this.triggers = document.querySelectorAll('[data-search-trigger]');
        this.closeButtons = document.querySelectorAll('[data-search-modal-close]');
        this.searchInput = document.querySelector('[data-search-input]');
        this.searchForm = document.querySelector('[data-search-form]');
        this.clearButton = document.querySelector('[data-search-clear]');
        
        this.initialState = document.querySelector('[data-search-initial]');
        this.loadingState = document.querySelector('[data-search-loading]');
        this.resultsState = document.querySelector('[data-search-results]');
        this.noResultsState = document.querySelector('[data-search-no-results]');
        
        this.debounceTimer = null;
        this.minSearchLength = 2;
        
        if (!this.modal) return;
        
        this.init();
    }

    init() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Open modal
        this.triggers.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                this.open();
            });
        });

        // Close modal
        this.closeButtons.forEach(button => {
            button.addEventListener('click', () => this.close());
        });

        // Search input
        if (this.searchInput) {
            this.searchInput.addEventListener('input', (e) => {
                const query = e.target.value.trim();
                
                // Show/hide clear button
                if (this.clearButton) {
                    if (query.length > 0) {
                        this.clearButton.classList.remove('hidden');
                    } else {
                        this.clearButton.classList.add('hidden');
                    }
                }

                // Debounce search
                clearTimeout(this.debounceTimer);
                
                if (query.length >= this.minSearchLength) {
                    this.debounceTimer = setTimeout(() => {
                        this.performSearch(query);
                    }, 300);
                } else {
                    this.showInitialState();
                }
            });

            // Focus input when modal opens
            this.modal.addEventListener('transitionend', () => {
                if (this.modal.getAttribute('aria-hidden') === 'false') {
                    this.searchInput.focus();
                }
            });
        }

        // Clear button
        if (this.clearButton) {
            this.clearButton.addEventListener('click', () => {
                this.searchInput.value = '';
                this.clearButton.classList.add('hidden');
                this.showInitialState();
                this.searchInput.focus();
            });
        }

        // Form submit
        if (this.searchForm) {
            this.searchForm.addEventListener('submit', (e) => {
                const query = this.searchInput?.value.trim();
                if (!query || query.length < this.minSearchLength) {
                    e.preventDefault();
                }
            });
        }

        // ESC key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.getAttribute('aria-hidden') === 'false') {
                this.close();
            }
        });
    }

    open() {
        this.modal.classList.remove('opacity-0', 'invisible');
        this.modal.classList.add('opacity-100', 'visible');
        this.modal.setAttribute('aria-hidden', 'false');
        
        document.body.style.overflow = 'hidden';
        
        // Reset to initial state
        this.showInitialState();
        
        // Clear previous search
        if (this.searchInput) {
            this.searchInput.value = '';
        }
    }

    close() {
        this.modal.classList.add('opacity-0', 'invisible');
        this.modal.classList.remove('opacity-100', 'visible');
        this.modal.setAttribute('aria-hidden', 'true');
        
        document.body.style.overflow = '';
    }

    async performSearch(query) {
        this.showLoadingState();

        try {
            // Use Salla search API
            const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
            const data = await response.json();

            if (data.products?.length > 0 || data.categories?.length > 0) {
                this.showResults(data);
            } else {
                this.showNoResults();
            }
        } catch (error) {
            console.error('Search error:', error);
            this.showNoResults();
        }
    }

    showInitialState() {
        this.hideAllStates();
        this.initialState?.classList.remove('hidden');
    }

    showLoadingState() {
        this.hideAllStates();
        this.loadingState?.classList.remove('hidden');
    }

    showResults(data) {
        this.hideAllStates();
        this.resultsState?.classList.remove('hidden');

        // Update products
        if (data.products?.length > 0) {
            const productsGrid = this.resultsState?.querySelector('[data-products-grid]');
            const productsCount = this.resultsState?.querySelector('[data-products-count]');
            const productsSection = this.resultsState?.querySelector('[data-search-products]');

            if (productsCount) {
                productsCount.textContent = data.products.length;
            }

            if (productsGrid) {
                productsGrid.innerHTML = data.products.map(product => this.renderProductCard(product)).join('');
            }

            productsSection?.classList.remove('hidden');
        }

        // Update categories
        if (data.categories?.length > 0) {
            const categoriesList = this.resultsState?.querySelector('[data-categories-list]');
            const categoriesCount = this.resultsState?.querySelector('[data-categories-count]');
            const categoriesSection = this.resultsState?.querySelector('[data-search-categories]');

            if (categoriesCount) {
                categoriesCount.textContent = data.categories.length;
            }

            if (categoriesList) {
                categoriesList.innerHTML = data.categories.map(category => 
                    `<a href="${category.url}" class="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm transition-colors">
                        ${category.name}
                    </a>`
                ).join('');
            }

            categoriesSection?.classList.remove('hidden');
        }
    }

    showNoResults() {
        this.hideAllStates();
        this.noResultsState?.classList.remove('hidden');
    }

    hideAllStates() {
        this.initialState?.classList.add('hidden');
        this.loadingState?.classList.add('hidden');
        this.resultsState?.classList.add('hidden');
        this.noResultsState?.classList.add('hidden');
    }

    renderProductCard(product) {
        return `
            <a href="${product.url}" class="product-card group block bg-white rounded-lg overflow-hidden hover:shadow-lg transition-all">
                <div class="aspect-square bg-gray-100 overflow-hidden">
                    <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover group-hover:scale-110 transition-transform" loading="lazy">
                </div>
                <div class="p-3">
                    <h3 class="text-sm font-medium line-clamp-2 mb-2">${product.name}</h3>
                    <div class="flex items-center justify-between">
                        <span class="text-primary font-bold">${product.price} ر.س</span>
                        ${product.is_on_sale ? `<span class="text-xs text-danger">خصم ${product.discount_percentage}%</span>` : ''}
                    </div>
                </div>
            </a>
        `;
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new SearchModal();
    });
} else {
    new SearchModal();
}

export default SearchModal;
