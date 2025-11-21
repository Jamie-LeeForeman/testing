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
    updateCart(); // Update cart page instantly if open
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
    
    if (cartSubtotal) cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;
    if (cartDiscount) cartDiscount.textContent = `$${discount.toFixed(2)}`;
    if (cartTax) cartTax.textContent = `$${tax.toFixed(2)}`;
    if (cartTotal) cartTotal.textContent = `$${total.toFixed(2)}`;
}

// IA#2 JS: Update checkout display
function updateCheckout() {
    const checkoutItems = document.getElementById('checkout-items');
    const checkoutTotal = document.getElementById('checkout-total');
    
    if (!checkoutItems || !checkoutTotal) return;
    
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
    const username = document.getElementById('username')?.value.trim();
    const password = document.getElementById('password')?.value;
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
    const name = document.getElementById('name')?.value.trim();
    const dob = document.getElementById('dob')?.value;
    const email = document.getElementById('email')?.value.trim();
    const username = document.getElementById('username')?.value.trim();
    const password = document.getElementById('password')?.value;
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
    alert('Registration successful! You can now log in.');
    window.location.href = 'login.html';
}

//Checkout with Card + Printable Invoice
function validateCheckout(event) {
    event.preventDefault();
    
    const name = document.getElementById('shipping-name')?.value.trim();
    const phone = document.getElementById('shipping-phone')?.value.trim() || "Not provided";
    const address = document.getElementById('shipping-address')?.value.trim();
    const cardNumber = document.getElementById('card-number')?.value.replace(/\s/g, '');
    const cardExpiry = document.getElementById('card-expiry')?.value;
    const cardCVV = document.getElementById('card-cvv')?.value;
    const cardName = document.getElementById('card-name')?.value.trim();
    const error = document.getElementById('checkout-error');

    // Reset error
    error.textContent = '';

    // Validation
    if (!name || !address || !cardNumber || !cardExpiry || !cardCVV || !cardName) {
        error.textContent = 'Please fill the payment and shipping fields.';
        return;
    }

    if (cardNumber.length < 13 || cardNumber.length > 19) {
        error.textContent = 'Invalid card number.';
        return;
    }

    if (!/^\d{2}\/\d{2}$/.test(cardExpiry)) {
        error.textContent = 'Expiry must be in MM/YY format.';
        return;
    }

    if (cardCVV.length < 3 || cardCVV.length > 4) {
        error.textContent = 'Invalid CVV.';
        return;
    }

    // Calculate totals
    let subtotal = 0;
    cart.forEach(item => subtotal += item.price * item.quantity);
    const discount = subtotal * 0.05;
    const tax = subtotal * 0.15;
    const total = subtotal - discount + tax;

    const orderNumber = 'JD' + Date.now().toString().slice(-8);
    const orderDate = new Date().toLocaleDateString('en-GB');

    // Generate printable invoice
    const invoice = window.open('', '_blank');
    invoice.document.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Invoice ${orderNumber}</title>
            <style>
                body { font-family: 'Segoe UI', Times New Roman, sans-serif; margin: 0; padding: 40px; background: #f9f9f9; }
                .invoice { max-width: 800px; margin: 0 auto; background: white; padding: 40px; border-radius: 10px; box-shadow: 0 5px 20px rgba(0,0,0,0.1); }
                .header { text-align: center; margin-bottom: 30px; }
                .header img { height: 90px; }
                h1 { color: #c49a6c; margin: 10px 0; }
                table { width: 100%; border-collapse: collapse; margin: 25px 0; }
                th, td { padding: 12px; text-align: left; border-bottom: 1px solid #eee; }
                th { background: #f8f8f8; }
                .total-row { font-size: 1.3em; font-weight: bold; color: #c49a6c; }
                .footer { margin-top: 50px; text-align: center; color: #666; font-size: 0.9em; }
                @media print { body { background: white; } .no-print { display: none; } }
            </style>
        </head>
        <body>
            <div class="invoice">
                <div class="header">
                    <img src="../Assets/J'dore_Home_Appliances.png" alt="J'dore Logo">
                    <h1>INVOICE</h1>
                    <p><strong>Order #:</strong> ${orderNumber} &nbsp;|&nbsp; <strong>Date:</strong> ${orderDate}</p>
                </div>

                <h3>Customer & Delivery</h3>
                <p><strong>Name:</strong> ${name}<br>
                   <strong>Phone:</strong> ${phone}<br>
                   <strong>Address:</strong> ${address}</p>

                <h3>Order Items</h3>
                <table>
                    <thead>
                        <tr><th>Product</th><th>Price</th><th>Qty</th><th>Total</th></tr>
                    </thead>
                    <tbody>
                        ${cart.map(item => `
                            <tr>
                                <td>${item.name}</td>
                                <td>$${item.price.toFixed(2)}</td>
                                <td>${item.quantity}</td>
                                <td>$${(item.price * item.quantity).toFixed(2)}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>

                <table style="width: 40%; margin-left: auto; margin-top: 20px;">
                    <tr><td>Subtotal</td><td style="text-align:right;">$${subtotal.toFixed(2)}</td></tr>
                    <tr><td>Discount (5%)</td><td style="text-align:right;">-$${discount.toFixed(2)}</td></tr>
                    <tr><td>Tax (15%)</td><td style="text-align:right;">+$${tax.toFixed(2)}</td></tr>
                    <tr class="total-row"><td><strong>TOTAL PAID</strong></td><td><strong>$${total.toFixed(2)}</strong></td></tr>
                </table>

                <div class="footer">
                    <p>Thank you for choosing <strong>J'dore Home Appliances</strong>!</p>
                    <p>Your order will be delivered in 3–5 business days.</p>
                    <p>Email: jamie-leemforeman@students.utech.edu.jm | Tel: 876-213-3955</p>
                </div>
            </div>
        </body>
        </html>
    `);
    invoice.document.close();
    invoice.focus();
    setTimeout(() => invoice.print(), 800);

    // Success message
    alert(`Payment Successful!\nOrder #${orderNumber}\nTotal Paid: $${total.toFixed(2)}\n\nYour invoice is now printing...`);

    // Clear cart and go home
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    setTimeout(() => window.location.href = 'index.html', 2500);
}

// IA#2 JS: Event listeners (runs on every page)
document.addEventListener('DOMContentLoaded', () => {
    // Add to cart buttons
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', addToCart);
    });

    // Forms
    const loginForm = document.getElementById('login-form');
    if (loginForm) loginForm.addEventListener('submit', validateLogin);

    const registerForm = document.getElementById('register-form');
    if (registerForm) registerForm.addEventListener('submit', validateRegister);

    const checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm) checkoutForm.addEventListener('submit', validateCheckout);

    // Cart buttons
    const clearCartBtn = document.getElementById('clear-cart');
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', () => {
            if (confirm('Clear entire cart?')) {
                cart = [];
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCart();
                updateCheckout();
            }
        });
    }

    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }
        window.location.href = 'checkout.html';
    });

    const cancelCheckout = document.getElementById('cancel-checkout');
    if (cancelCheckout) cancelCheckout.addEventListener('click', () => {
        if (confirm('Cancel checkout and return to cart?')) {
            window.location.href = 'cart.html';
        }
    });

    const closeCheckout = document.getElementById('close-checkout');
    if (closeCheckout) closeCheckout.addEventListener('click', () => {
        if (confirm('Leave checkout and go home? Cart will be saved.')) {
            window.location.href = 'index.html';
        }
    });

    // Always update displays when page loads
    updateCart();
    updateCheckout();
});