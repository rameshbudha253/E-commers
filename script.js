// Sample products data
const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        price: 99.99,
        category: "Electronics",
        image: "https://infotechsnepal.com.np/_next/image/?url=https%3A%2F%2Fapp.infotechsnepal.com.np%2Fwp-content%2Fuploads%2F2024%2F09%2FP3960-ANC-Headphone-blue.jpg&w=1080&q=75",
        description: "High-quality wireless headphones with noise cancellation and 30-hour battery life."
    },
    {
        id: 2,
        name: "Smart Watch",
        price: 199.99,
        category: "Electronics",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTOQfHW3hImIRvhk5ZRzaX74A9XC6Ol8z4-Q&s",
        description: "Feature-rich smartwatch with heart rate monitor, GPS, and water resistance."
    },
    {
        id: 3,
        name: "Cotton T-Shirt",
        price: 24.99,
        category: "Fashion",
        image: "https://tmlewin.co.uk/cdn/shop/files/Crewneck_Tshirt_Denim_67941_FLF.jpg?v=1727367283&width=1946",
        description: "Comfortable 100% cotton t-shirt available in multiple colors and sizes."
    },
    {
        id: 4,
        name: "Running Shoes",
        price: 79.99,
        category: "Fashion",
        image: "https://m.media-amazon.com/images/I/71B-AakjjlL._UY900_.jpg",
        description: "Lightweight running shoes with extra cushioning and breathable material."
    },
    {
        id: 5,
        name: "Coffee Maker",
        price: 59.99,
        category: "Home",
        image: "https://www.kyowa.com.ph/cdn/shop/products/KW-1213.jpg?v=1744361305",
        description: "Programmable coffee maker with thermal carafe and built-in grinder."
    },
    {
        id: 6,
        name: "Blender",
        price: 49.99,
        category: "Home",
        image: "https://m.media-amazon.com/images/I/81VoJ7+UmaL.jpg",
        description: "High-powered blender perfect for smoothies, soups, and more."
    },
    {
        id: 7,
        name: "Moisturizer",
        price: 29.99,
        category: "Beauty",
        image: "https://m.media-amazon.com/images/I/6147cwOvHBL._UF1000,1000_QL80_.jpg",
        description: "Hydrating moisturizer with SPF 30 for daily sun protection."
    },
    {
        id: 8,
        name: "Lipstick",
        price: 19.99,
        category: "Beauty",
        image: "https://static-01.daraz.com.np/p/2f30908efcf4ef6d2c75a687af8ee251.jpg",
        description: "Long-lasting, vibrant lipstick available in multiple shades."
    },
     {
        id: 8,
        name: "sunscreen",
        price: 19.99,
        category: "Beauty",
        image: "https://www.britishcosmetics.com/cdn/shop/files/WhatsApp-Image-2024-10-14-at-08.34.37_1024x1024.jpg?v=1741499240",
        description: "Broad-spectrum sunscreen with SPF 50, perfect for daily use."
    },
     {
        id: 8,
        name: "perfume",
        price: 19.99,
        category: "Beauty",
        image: "https://puls-img.chanel.com/1702488169518-allmarketsmobile375x400pxx4jpg.jpg",
        description: "Elegant perfume with a blend of floral and woody notes, perfect for any occasion."
    }
];

// DOM Elements
const featuredProductsContainer = document.getElementById('featured-products');
const productModal = document.getElementById('product-modal');
const modalBody = document.getElementById('modal-body');
const closeModal = document.querySelector('.close');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const searchInput = document.getElementById('search-input');
const categoryFilters = document.querySelectorAll('.category-filter');
const cartIcon = document.querySelector('.fa-shopping-cart');

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Load featured products
    loadFeaturedProducts();
    
    // Initialize cart icon with item count
    updateCartIcon();
    
    // Event listeners
    if (closeModal) {
        closeModal.addEventListener('click', () => {
            productModal.style.display = 'none';
        });
    }
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }
    
    window.addEventListener('click', (event) => {
        if (event.target === productModal) {
            productModal.style.display = 'none';
        }
    });
    
    // Add to cart buttons event listeners
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('add-to-cart')) {
            const productId = e.target.getAttribute('data-id');
            addToCart(productId);
        }
        
        if (e.target.classList.contains('modal-add-to-cart')) {
            const productId = e.target.getAttribute('data-id');
            const quantity = document.getElementById('quantity-input').value;
            addToCart(productId, quantity);
            productModal.style.display = 'none';
        }
        
        if (e.target.classList.contains('product-image') || e.target.classList.contains('product-info')) {
            const productCard = e.target.closest('.product-card');
            if (productCard) {
                const productId = productCard.getAttribute('data-id');
                openProductModal(productId);
            }
        }
    });
    
    // Quantity controls in modal
    document.addEventListener('click', function(e) {
        if (e.target.id === 'increase-quantity') {
            const input = document.getElementById('quantity-input');
            input.value = parseInt(input.value) + 1;
        }
        
        if (e.target.id === 'decrease-quantity') {
            const input = document.getElementById('quantity-input');
            if (parseInt(input.value) > 1) {
                input.value = parseInt(input.value) - 1;
            }
        }
    });
});

// Load featured products
function loadFeaturedProducts() {
    if (!featuredProductsContainer) return;
    
    // Display only first 4 products as featured
    const featuredProducts = products.slice(0, 4);
    
    featuredProductsContainer.innerHTML = featuredProducts.map(product => `
        <div class="product-card" data-id="${product.id}">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>$${product.price.toFixed(2)}</p>
                <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
            </div>
        </div>
    `).join('');
}

// Open product modal
function openProductModal(productId) {
    const product = products.find(p => p.id == productId);
    
    if (!product) return;
    
    modalBody.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="modal-product-image">
        <div class="modal-product-info">
            <h2>${product.name}</h2>
            <p class="price">$${product.price.toFixed(2)}</p>
            <p class="description">${product.description}</p>
            <div class="quantity-controls">
                <button id="decrease-quantity">-</button>
                <input type="number" id="quantity-input" value="1" min="1">
                <button id="increase-quantity">+</button>
            </div>
            <button class="modal-add-to-cart" data-id="${product.id}">Add to Cart</button>
        </div>
    `;
    
    productModal.style.display = 'block';
}

// Add to cart function
function addToCart(productId, quantity = 1) {
    // Get cart from localStorage or initialize empty array
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Find if product already in cart
    const existingProductIndex = cart.findIndex(item => item.id == productId);
    
    if (existingProductIndex > -1) {
        // If product exists, update quantity
        cart[existingProductIndex].quantity += parseInt(quantity);
    } else {
        // If new product, add to cart
        const product = products.find(p => p.id == productId);
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: parseInt(quantity)
        });
    }
    
    // Save cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update cart icon
    updateCartIcon();
    
    // Show confirmation message
    alert(`${quantity} ${quantity > 1 ? 'items' : 'item'} added to cart!`);
}

// Update cart icon with item count
function updateCartIcon() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    
    // Update cart icon in header
    const cartIcons = document.querySelectorAll('.fa-shopping-cart');
    cartIcons.forEach(icon => {
        // Remove any existing badge
        const existingBadge = icon.parentElement.querySelector('.cart-count');
        if (existingBadge) {
            existingBadge.remove();
        }
        
        // Add new badge if items in cart
        if (totalItems > 0) {
            const badge = document.createElement('span');
            badge.className = 'cart-count';
            badge.textContent = totalItems;
            badge.style.position = 'absolute';
            badge.style.top = '-10px';
            badge.style.right = '-10px';
            badge.style.backgroundColor = '#0722f1ff';
            badge.style.color = '#e52020ff';
            badge.style.borderRadius = '50%';
            badge.style.width = '20px';
            badge.style.height = '20px';
            badge.style.display = 'flex';
            badge.style.alignItems = 'center';
            badge.style.justifyContent = 'center';
            badge.style.fontSize = '12px';
            badge.style.fontWeight = 'bold';
            icon.parentElement.style.position = 'relative';
            icon.parentElement.appendChild(badge);
        }
    });
}

// Search functionality
function searchProducts(query) {
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase())
    );
    
    displayProducts(filteredProducts);
}

// Filter by category
function filterByCategory(category) {
    if (category === 'All') {
        displayProducts(products);
    } else {
        const filteredProducts = products.filter(product => product.category === category);
        displayProducts(filteredProducts);
    }
}

// Display products
function displayProducts(productsToDisplay) {
    const productsContainer = document.getElementById('products-container');
    if (!productsContainer) return;
    
    productsContainer.innerHTML = productsToDisplay.map(product => `
        <div class="product-card" data-id="${product.id}">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>$${product.price.toFixed(2)}</p>
                <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
            </div>
        </div>
    `).join('');
}

// Update todo list to mark first task as completed and start the next one