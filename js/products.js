// Products data
const products = [
    {
        id: 1,
        name: "NUCLEAR NACHO",
        description: "So spicy it should be illegal. Government warning: may cause taste bud meltdown.",
        image: "images/product1.jpg",
        price: 3.99,
        heatLevel: 5
    },
    {
        id: 2,
        name: "SOUR BLAST",
        description: "Face-twisting sour with an explosive fruity finish. Not for the weak-jawed.",
        image: "images/product2.jpg",
        price: 3.99,
        heatLevel: 1
    },
    {
        id: 3,
        name: "BBQ INFERNO",
        description: "Smoky, sweet, and with a kick that'll leave you breathless. Proceed with caution.",
        image: "images/product3.jpg",
        price: 3.99,
        heatLevel: 4
    },
    {
        id: 4,
        name: "CHEESE QUAKE",
        description: "The cheesiest crunch known to humankind. Warning: may cause addiction.",
        image: "images/product4.jpg",
        price: 3.99,
        heatLevel: 2
    },
    {
        id: 5,
        name: "WASABI REAPER",
        description: "Japanese heat meets Carolina pain. Only for true flavor warriors.",
        image: "images/product5.jpg",
        price: 3.99,
        heatLevel: 5
    },
    {
        id: 6,
        name: "SWEET CHILI THUNDER",
        description: "Sweet meets heat in this flavor storm. Comes with a satisfaction guarantee.",
        image: "images/product6.jpg",
        price: 3.99,
        heatLevel: 3
    }
];

// Load products into the grid
document.addEventListener('DOMContentLoaded', function() {
    const productsGrid = document.getElementById('products-grid');
    
    products.forEach(product => {
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
            showProductDetails(product);
        });
        
        orderBtn.addEventListener('click', () => {
            addToCart(product);
        });
    });
});

function showProductDetails(product) {
    // In a real implementation, this would show a modal or navigate to a detail page
    alert(`${product.name}\n\n${product.description}\n\nHeat Level: ${'🔥'.repeat(product.heatLevel)}\nPrice: $${product.price}`);
}

function addToCart(product) {
    // In a real implementation, this would add the product to a shopping cart
    alert(`Added ${product.name} to your cart!`);
}