// IA#2 JS: Cart storage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// IA#2 JS: Add to cart function
function addToCart(event) {
    const button = event.target;
    const product = {
        id: button.dataset.id,
        name: button.dataset.name,
        price: parseFloat(button.dataset.price),
        quantity: 1
    };
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push(product);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${product.name} added to cart!`);
}

// IA#2 JS: Update cart display
function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartSubtotal = document.getElementById('cart-subtotal');
    const cartDiscount = document.getElementById('cart-discount');
    const cartTax = document.getElementById('cart-tax');
    const cartTotal = document.getElementById('cart-total');
    
    if (!cartItems) return;
    
    cartItems.innerHTML = '';
    let subtotal = 0;
    
    cart.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>$${item.price.toFixed(2)}</td>
            <td>${item.quantity}</td>
            <td>$${(item.price * item.quantity).toFixed(2)}</td>
        `;
        cartItems.appendChild(row);
        subtotal += item.price * item.quantity;
    });
    
    const discount = subtotal * 0.05;
    const tax = subtotal * 0.15;
    const total = subtotal - discount + tax;
    
    cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;
    cartDiscount.textContent = `$${discount.toFixed(2)}`;
    cartTax.textContent = `$${tax.toFixed(2)}`;
    cartTotal.textContent = `$${total.toFixed(2)}`;
}

// IA#2 JS: Update checkout display
function updateCheckout() {
    const checkoutItems = document.getElementById('checkout-items');
    const checkoutTotal = document.getElementById('checkout-total');
    
    if (!checkoutItems) return;
    
    checkoutItems.innerHTML = '';
    let subtotal = 0;
    
    cart.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>$${item.price.toFixed(2)}</td>
            <td>${item.quantity}</td>
            <td>$${(item.price * item.quantity).toFixed(2)}</td>
        `;
        checkoutItems.appendChild(row);
        subtotal += item.price * item.quantity;
    });
    
    const discount = subtotal * 0.05;
    const tax = subtotal * 0.15;
    const total = subtotal - discount + tax;
    
    checkoutTotal.textContent = `$${total.toFixed(2)}`;
}

// IA#2 JS: Login form validation
function validateLogin(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const error = document.getElementById('login-error');
    
    if (!username || !password) {
        error.textContent = 'Please fill in all fields';
        return;
    }
    
    if (username !== '2203352' || password !== 'webprogramming') {
        error.textContent = 'Incorrect username or password, please TRY AGAIN';
        return;
    }
    
    error.textContent = '';
    alert('Login successful!');
    window.location.href = 'products.html';
}

// IA#2 JS: Register form validation
function validateRegister(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const dob = document.getElementById('dob').value;
    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const error = document.getElementById('register-error');
    
    if (!name || !dob || !email || !username || !password) {
        error.textContent = 'Please fill in all fields';
        return;
    }
    
    if (!email.includes('@')) {
        error.textContent = 'Please enter a valid email';
        return;
    }
    
    error.textContent = '';
    alert('Registration successful!');
}

// IA#2 JS: Checkout form validation
function validateCheckout(event) {
    event.preventDefault();
    const name = document.getElementById('shipping-name').value;
    const address = document.getElementById('shipping-address').value;
    const amountPaid = document.getElementById('amount-paid').value;
    const error = document.getElementById('checkout-error');
    
    if (!name || !address || !amountPaid) {
        error.textContent = 'Please fill in all fields';
        return;
    }
    
    error.textContent = '';
    alert('Order confirmed!');
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    window.location.href = 'index.html';
}

// IA#2 JS: Event listeners
document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => button.addEventListener('click', addToCart));
    
    const loginForm = document.getElementById('login-form');
    if (loginForm) loginForm.addEventListener('submit', validateLogin);
    
    const registerForm = document.getElementById('register-form');
    if (registerForm) registerForm.addEventListener('submit', validateRegister);
    
    const checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm) checkoutForm.addEventListener('submit', validateCheckout);
    
    const clearCartBtn = document.getElementById('clear-cart');
    if (clearCartBtn) clearCartBtn.addEventListener('click', () => {
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCart();
    });
    
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) checkoutBtn.addEventListener('click', () => {
        window.location.href = 'checkout.html';
    });
    
    const cancelCheckout = document.getElementById('cancel-checkout');
    if (cancelCheckout) cancelCheckout.addEventListener('click', () => {
        window.location.href = 'cart.html';
    });
    
    const closeCheckout = document.getElementById('close-checkout');
    if (closeCheckout) closeCheckout.addEventListener('click', () => {
        window.location.href = 'index.html';
    });
    
    updateCart();
    updateCheckout();
});