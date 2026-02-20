// Menu Data Container
const menuData = [
    { id: 1, category: 'ordenes', title: 'Kilo de carne estilo árabe', price: 330.00, description: 'Nuestro famoso estilo árabe por kilo. Ideal para compartir.', popular: true },
    { id: 2, category: 'tacos', title: 'Taco árabe con carne árabe', price: 56.00, description: 'Taco de pan árabe con bistec de res.', popular: true },
    { id: 3, category: 'tacos', title: 'Orden de tacos al pastor', price: 90.00, description: '5 taquitos al pastor con cilantro, cebolla y piña.', popular: true },
    { id: 4, category: 'quesadillas', title: 'Alambre de bistec', price: 120.00, description: 'Clásico alambre con bistec.', popular: false },
    { id: 5, category: 'ordenes', title: 'Orden de chorizo', price: 110.00, description: 'Chorizo de la casa.', popular: false },
    { id: 6, category: 'ordenes', title: 'Orden de cecina', price: 110.00, description: 'Cecina de Yecapixtla.', popular: false },
    { id: 7, category: 'ordenes', title: 'Orden de adobada', price: 110.00, description: 'Carne adobada con la receta secreta.', popular: false },
    { id: 8, category: 'ordenes', title: 'Orden de chiles toreados', price: 15.00, description: 'Para los amantes del picante.', popular: false },
    { id: 9, category: 'ordenes', title: 'Orden de nopales', price: 40.00, description: 'Nopales asados al momento.', popular: false },
    { id: 10, category: 'quesadillas', title: 'Alambre de pollo', price: 120.00, description: 'Pechuga de pollo con pimientos y queso.', popular: false },
    { id: 11, category: 'ordenes', title: 'Orden de chistorra', price: 110.00, description: 'Chistorra importada de calidad.', popular: false },
    { id: 12, category: 'quesadillas', title: 'Alambre de cecina', price: 120.00, description: 'Cecina con mezcla de vegetales y queso.', popular: false },
    { id: 13, category: 'ordenes', title: 'Orden de chuleta', price: 110.00, description: 'Chuleta ahumada.', popular: false },
    { id: 14, category: 'quesadillas', title: 'Alambre Hawaiano', price: 120.00, description: 'Con piña, jamón y queso.', popular: false },
    { id: 15, category: 'quesadillas', title: 'Alambre de chistorra', price: 120.00, description: 'Chistorra con pimientos y queso fundido.', popular: false },
    { id: 16, category: 'tacos', title: 'Taco de chorizo', price: 35.00, description: 'Taco sencillo.', popular: false, options: ['Tortilla de Harina', 'Tortilla de Maíz'] },
    { id: 17, category: 'tacos', title: 'Taco de bistec', price: 35.00, description: 'Bistec jugoso.', popular: false, options: ['Tortilla de Harina', 'Tortilla de Maíz'] },
    { id: 18, category: 'tacos', title: 'Taco de pastor', price: 35.00, description: 'carne al pastor, cilantro, cebolla y piña.', popular: false, options: ['Tortilla de Harina', 'Tortilla de Maíz'] },
    { id: 19, category: 'tacos', title: 'Taco de adobada', price: 35.00, description: 'Bistec jugoso.', popular: false, options: ['Tortilla de Harina', 'Tortilla de Maíz'] }
];

// Cart State
let cart = [];
let pendingItem = null; // Item waiting for option selection

document.addEventListener('DOMContentLoaded', () => {
    // Navbar Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = navToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Smooth Scroll for Anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            navLinks.classList.remove('active'); // Close mobile menu if open
            if (navToggle) {
                navToggle.querySelector('i').classList.remove('fa-times');
                navToggle.querySelector('i').classList.add('fa-bars');
            }

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Render Menu
    const menuContainer = document.getElementById('menu-container');
    const filterBtns = document.querySelectorAll('.filter-btn');

    function formatPrice(price) {
        // Handle string or number input
        const numPrice = parseFloat(price);
        return `$${numPrice.toFixed(2)}`;
    }

    function renderMenu(category = 'favoritos') {
        menuContainer.innerHTML = '';

        let filteredItems;
        if (category === 'favoritos') {
            filteredItems = menuData.filter(item => item.popular);
        } else if (category === 'all') {
            // Fallback if needed, though 'all' button is gone
            filteredItems = menuData;
        } else {
            filteredItems = menuData.filter(item => item.category === category);
        }

        if (filteredItems.length === 0) {
            menuContainer.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #ccc;">No hay platillos disponibles en esta categoría.</p>';
            return;
        }

        filteredItems.forEach((item, index) => {
            const menuItem = document.createElement('div');
            menuItem.className = 'menu-item fade-in';
            menuItem.style.animationDelay = `${index * 0.05}s`; // Staggered animation

            menuItem.innerHTML = `
                <div class="menu-item-header">
                    <h3 class="menu-title">${item.title}</h3>
                    <span class="menu-price">${formatPrice(item.price)}</span>
                </div>
                <p class="menu-desc">${item.description}</p>
                ${item.popular ? '<div style="position:absolute; top:0; right:0; background:var(--accent-gold); color:black; font-size:0.7rem; padding:2px 8px; font-weight:bold;">FAVORITO</div>' : ''}
                <div class="add-to-cart-container">
                    <button class="add-to-cart-btn" onclick="addToCart(${item.id})">
                        <i class="fas fa-plus"></i> Agregar
                    </button>
                </div>
            `;

            menuContainer.appendChild(menuItem);

            // Trigger reflow to restart animation
            void menuItem.offsetWidth;
            menuItem.classList.add('visible');
        });
    }

    // Menu Filtering
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');
            renderMenu(filter);
        });
    });

    // Init Menu
    renderMenu('favoritos');

    // Options Modal Elements
    const optionsModal = document.getElementById('options-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalOptionsContainer = document.getElementById('modal-options-container');

    window.closeOptionsModal = function () {
        optionsModal.classList.remove('active');
        pendingItem = null;
    };

    function openOptionsModal(item) {
        pendingItem = item;
        modalTitle.textContent = `Elige opción para: ${item.title}`;
        modalOptionsContainer.innerHTML = '';

        item.options.forEach(option => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.textContent = option;
            btn.onclick = () => confirmOption(option);
            modalOptionsContainer.appendChild(btn);
        });

        optionsModal.classList.add('active');
    }

    function confirmOption(option) {
        if (pendingItem) {
            addToCartInternal(pendingItem, option);
            closeOptionsModal();
        }
    }

    // Cart Elements
    const cartBtn = document.getElementById('cart-btn');
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartOverlay = document.getElementById('cart-overlay');
    const closeCartBtn = document.getElementById('close-cart');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalPrice = document.getElementById('cart-total-price');
    const cartCount = document.querySelector('.cart-count');
    const checkoutBtn = document.getElementById('checkout-btn');
    const toast = document.getElementById('toast');

    // Toggle Cart
    function toggleCart() {
        cartSidebar.classList.toggle('active');
        cartOverlay.classList.toggle('active');
    }

    cartBtn.addEventListener('click', toggleCart);
    closeCartBtn.addEventListener('click', toggleCart);
    cartOverlay.addEventListener('click', toggleCart);

    // Add to Cart (Global function)
    window.addToCart = function (id) {
        const item = menuData.find(i => i.id === id);
        if (!item) return;

        if (item.options && item.options.length > 0) {
            openOptionsModal(item);
        } else {
            addToCartInternal(item);
        }
    };

    function addToCartInternal(item, variant = null) {
        // Build a unique key for comparison (id + variant)
        const existingItemIndex = cart.findIndex(i => i.id === item.id && i.variant === variant);

        if (existingItemIndex > -1) {
            cart[existingItemIndex].quantity += 1;
        } else {
            cart.push({ ...item, quantity: 1, variant: variant });
        }

        updateCartUI();
        const toastMsg = variant ? `${item.title} (${variant})` : item.title;
        showToast(`Agregado: ${toastMsg}`);
    }

    // Remove from Cart (By Index)
    window.removeFromCart = function (index) {
        if (cart[index].quantity > 1) {
            cart[index].quantity -= 1;
        } else {
            cart.splice(index, 1);
        }
        updateCartUI();
    };

    // Increase Quantity (By Index)
    window.increaseQty = function (index) {
        cart[index].quantity += 1;
        updateCartUI();
    };

    function updateCartUI() {
        // Update Count
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;

        // Update Total Price
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotalPrice.textContent = formatPrice(total);

        // Render Items
        cartItemsContainer.innerHTML = '';
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<div class="empty-cart-msg">Tu carrito está vacío</div>';
            return;
        }

        cart.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';

            const titleDisplay = item.variant
                ? `${item.title} <br><span style="font-size:0.8em; color:var(--text-muted);">(${item.variant})</span>`
                : item.title;

            cartItem.innerHTML = `
                <div class="cart-item-info">
                    <h4>${titleDisplay}</h4>
                    <p>${formatPrice(item.price)} x ${item.quantity} = ${formatPrice(item.price * item.quantity)}</p>
                </div>
                <div class="cart-item-controls">
                    <button class="qty-btn" onclick="removeFromCart(${index})"><i class="fas fa-minus"></i></button>
                    <span class="cart-item-qty">${item.quantity}</span>
                    <button class="qty-btn" onclick="increaseQty(${index})"><i class="fas fa-plus"></i></button>
                </div>
            `;
            cartItemsContainer.appendChild(cartItem);
        });
    }

    function showToast(message) {
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    // Checkout (WhatsApp)
    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            showToast('Agrega productos antes de pedir');
            return;
        }

        const phoneNumber = '7226878583'; // Number from footer
        let message = "Hola, me gustaría hacer un pedido:\n\n";

        cart.forEach(item => {
            const itemName = item.variant ? `${item.title} (${item.variant})` : item.title;
            message += `- ${item.quantity}x ${itemName} ($${item.price * item.quantity})\n`;
        });

        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        message += `\n*Total: ${formatPrice(total)}*`;

        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    });

    // Initial render
    renderMenu();

    // Intersection Observer for Scroll Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in, .fade-in-up, .fade-in-left, .fade-in-right').forEach(el => {
        observer.observe(el);
    });

    // Navbar Background on Scroll
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.padding = '10px 0';
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.5)';
        } else {
            navbar.style.padding = '20px 0';
            navbar.style.boxShadow = 'none';
        }
    });
});
