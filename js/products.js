// Cart functionality
let cart = [];

// DOM elements
const cartIcon = document.getElementById('cart-icon');
const cartDropdown = document.getElementById('cart-dropdown');
const cartItemsContainer = document.getElementById('cart-items');
const cartCount = document.querySelector('.cart-count');
const cartTotal = document.getElementById('cart-total');
const closeCart = document.querySelector('.close-cart');

// Toggle cart dropdown
cartIcon.addEventListener('click', () => {
    cartDropdown.classList.toggle('active');
});

// Close cart dropdown
closeCart.addEventListener('click', () => {
    cartDropdown.classList.remove('active');
});

// Add to cart function
function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCart();
    showCartAlert(product);
}

// Update cart UI
function updateCart() {
    // Update cart count
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Update cart items
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<div class="empty-cart">No items added yet. CRUNCH HARDER!</div>';
    } else {
        cartItemsContainer.innerHTML = cart.map(item => `
            <div class="cart-item" data-id="${item.id}">
                <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">₹${item.price}</div>
                    <div class="cart-item-actions">
                        <button class="quantity-btn minus">-</button>
                        <span class="cart-item-quantity">${item.quantity}</span>
                        <button class="quantity-btn plus">+</button>
                        <span class="remove-item">REMOVE</span>
                    </div>
                </div>
            </div>
        `).join('');
        
        // Add event listeners to quantity buttons
        document.querySelectorAll('.quantity-btn').forEach(button => {
            button.addEventListener('click', function() {
                const itemId = parseInt(this.closest('.cart-item').dataset.id);
                const item = cart.find(item => item.id === itemId);
                
                if (this.classList.contains('minus')) {
                    if (item.quantity > 1) {
                        item.quantity--;
                    } else {
                        cart = cart.filter(item => item.id !== itemId);
                    }
                } else if (this.classList.contains('plus')) {
                    item.quantity++;
                }
                
                updateCart();
            });
        });
        
        // Add event listeners to remove buttons
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', function() {
                const itemId = parseInt(this.closest('.cart-item').dataset.id);
                cart = cart.filter(item => item.id !== itemId);
                updateCart();
            });
        });
    }
    
    // Update total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = `₹${total}`;
}

// Close cart when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.cart-container') && cartDropdown.classList.contains('active')) {
        cartDropdown.classList.remove('active');
    }
});
// Products data - moved to external JSON but kept here for reference
const products = [
    {
        id: 1,
        name: "NUCLEAR NACHO",
        description: "So spicy it should be illegal. Government warning: may cause taste bud meltdown.",
        image: "images/product1.jpg",
        price: 3.99,
        heatLevel: 5,
        ingredients: "Potatoes, Nuclear Chili Blend, Artificial Nacho Dust, Capsaicin Crystals",
        crunchFactor: 10
    },
    {
        id: 2,
        name: "SOUR BLAST",
        description: "Face-twisting sour with an explosive fruity finish. Not for the weak-jawed.",
        image: "images/product2.jpg",
        price: 3.99,
        heatLevel: 1,
        ingredients: "Potatoes, Citric Acid Storm, Artificial Fruit Tornado, Sour Shock Powder",
        crunchFactor: 9
    },
    {
        id: 3,
        name: "BBQ INFERNO",
        description: "Smoky, sweet, and with a kick that'll leave you breathless. Proceed with caution.",
        image: "images/product3.jpg",
        price: 3.99,
        heatLevel: 4,
        ingredients: "Potatoes, Smoked Paprika Apocalypse, Molasses Lava, Chili Fire Dust",
        crunchFactor: 8
    },
    {
        id: 4,
        name: "CHEESE QUAKE",
        description: "The cheesiest crunch known to humankind. Warning: may cause addiction.",
        image: "images/product4.jpg",
        price: 3.99,
        heatLevel: 2,
        ingredients: "Potatoes, Artificial Cheese Earthquake, Dairy Tsunami Powder, Umami Bomb",
        crunchFactor: 7
    },
    {
        id: 5,
        name: "WASABI REAPER",
        description: "Japanese heat meets Carolina pain. Only for true flavor warriors.",
        image: "images/product5.jpg",
        price: 3.99,
        heatLevel: 5,
        ingredients: "Potatoes, Wasabi Grenade, Carolina Reaper Dust, Sinus Destroyer XT",
        crunchFactor: 10
    },
    {
        id: 6,
        name: "SWEET CHILI THUNDER",
        description: "Sweet meets heat in this flavor storm. Comes with a satisfaction guarantee.",
        image: "images/product6.jpg",
        price: 3.99,
        heatLevel: 3,
        ingredients: "Potatoes, Sweet Chili Lightning, Garlic Thunder Powder, Sugar Storm",
        crunchFactor: 8
    }
];

// Create modal element
function createModal() {
    const modal = document.createElement('div');
    modal.className = 'product-modal';
    modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <button class="modal-close">&times;</button>
            <div class="modal-image-container">
                <img src="" alt="" class="modal-image">
                <div class="modal-badge">CRUNCH FACTOR: <span id="crunch-factor">0</span>/10</div>
            </div>
            <div class="modal-info">
                <h2 class="modal-title"></h2>
                <div class="modal-heat">
                    HEAT LEVEL: 
                    <div class="heat-levels" id="heat-levels"></div>
                </div>
                <p class="modal-description"></p>
                <div class="modal-details">
                    <h3>INGREDIENTS:</h3>
                    <p class="modal-ingredients"></p>
                </div>
                <div class="modal-price">$<span></span></div>
                <button class="modal-order cta-btn pulse">ORDER NOW</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    return modal;
}

// Load products into the grid
document.addEventListener('DOMContentLoaded', function() {
    const productsGrid = document.getElementById('products-grid');
    const modal = createModal();
    
    // Load products from JSON (in a real app, this would be a fetch request)
    // For now we'll use the products array defined above
    loadProducts(products);
    
    function loadProducts(productsData) {
        productsGrid.innerHTML = '';
        
        productsData.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <div class="product-overlay">
                    <h3>${product.name}</h3>
                    <div class="product-btns">
                        <button class="product-btn details-btn">DETAILS</button>
                        <button class="product-btn order-btn">ORDER</button>
                    </div>
                </div>
            `;
            
            productsGrid.appendChild(productCard);
            
            // Add event listeners to buttons
            const detailsBtn = productCard.querySelector('.details-btn');
            const orderBtn = productCard.querySelector('.order-btn');
            
            detailsBtn.addEventListener('click', () => {
                showProductModal(product);
            });
            
            orderBtn.addEventListener('click', () => {
                addToCart(product);
            });
        });
    }
    
    function showProductModal(product) {
        // Set modal content
        modal.querySelector('.modal-image').src = product.image;
        modal.querySelector('.modal-image').alt = product.name;
        modal.querySelector('.modal-title').textContent = product.name;
        modal.querySelector('.modal-description').textContent = product.description;
        modal.querySelector('.modal-ingredients').textContent = product.ingredients;
        modal.querySelector('.modal-price span').textContent = product.price;
        modal.querySelector('#crunch-factor').textContent = product.crunchFactor;
        
        // Set heat level indicators
        const heatLevels = modal.querySelector('#heat-levels');
        heatLevels.innerHTML = '';
        for (let i = 0; i < 5; i++) {
            const heatDot = document.createElement('div');
            heatDot.className = 'heat-dot';
            if (i < product.heatLevel) {
                heatDot.classList.add('active');
                if (product.heatLevel >= 4) {
                    heatDot.classList.add('hot');
                }
            }
            heatLevels.appendChild(heatDot);
        }
        
        // Set order button event
        const orderBtn = modal.querySelector('.modal-order');
        orderBtn.addEventListener('click', () => {
            addToCart(product);
            closeModal();
        });
        
        // Show modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Close modal events
        const closeBtn = modal.querySelector('.modal-close');
        const overlay = modal.querySelector('.modal-overlay');
        
        closeBtn.addEventListener('click', closeModal);
        overlay.addEventListener('click', closeModal);
        
        function closeModal() {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
    
    function addToCart(product) {
        // In a real implementation, this would add the product to a shopping cart
        alert(`Added ${product.name} to your cart for ₹${product.price}!`);
    }
});