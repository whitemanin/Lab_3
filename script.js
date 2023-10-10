// Приклад списку товарів (можна замінити на базу даних)
const products = [
    { id: 1, name: 'Креатин', price: 1000, image: './img/1.png' },
    { id: 2, name: 'Амінокислоти', price: 1500, image: './img/2.png' },
    { id: 3, name: 'Протеїн', price: 2500, image: './img/3.png' },
];

const productList = document.getElementById('product-list');
const cartList = document.getElementById('cart-list-popup');
const totalPriceElement = document.getElementById('total-price-popup');
const clearCartButton = document.getElementById('clear-cart-popup');

let cart = [];

// Функція для відображення товарів
function displayProducts() {
    productList.innerHTML = '';
    products.forEach(product => {
        const li = document.createElement('li');
        li.innerHTML = `
            <img src="${product.image}" alt="${product.name}" width="100">
            <span>${product.name} - ${product.price} грн</span>
            <button class="add-to-cart" data-id="${product.id}">Додати до корзини</button>
        `;
        productList.appendChild(li);
    });
}

// Функція для відображення корзини
function displayCart() {
    cartList.innerHTML = '';
    let totalPrice = 0;
    cart.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `
            <img src="${item.image}" alt="${item.name}" width="100">
            <span>${item.name} x ${item.quantity} - ${item.price * item.quantity} грн</span>
            <button class="remove-from-cart" data-id="${item.id}">Видалити</button>
        `;
        cartList.appendChild(li);
        totalPrice += item.price * item.quantity;
    });
    totalPriceElement.textContent = totalPrice;
}

// Функція для додавання товару до корзини
function addToCart(productId) {
    const productToAdd = products.find(product => product.id === productId);
    if (productToAdd) {
        const existingCartItem = cart.find(item => item.id === productId);
        if (existingCartItem) {
            existingCartItem.quantity += 1;
        } else {
            cart.push({ ...productToAdd, quantity: 1 });
        }
        displayCart();
    }
}

// Функція для видалення товару з корзини
function removeFromCart(productId) {
    const index = cart.findIndex(item => item.id === productId);
    if (index !== -1) {
        cart.splice(index, 1);
        displayCart();
    }
}

// Очищення корзини
clearCartButton.addEventListener('click', () => {
    cart = [];
    displayCart();
});

// Обробники подій
productList.addEventListener('click', e => {
    if (e.target.classList.contains('add-to-cart')) {
        const productId = parseInt(e.target.getAttribute('data-id'));
        addToCart(productId);
    }
});

cartList.addEventListener('click', e => {
    if (e.target.classList.contains('remove-from-cart')) {
        const productId = parseInt(e.target.getAttribute('data-id'));
        removeFromCart(productId);
    }
});

// Відкриття корзини при кліку
document.getElementById('show-cart-popup').addEventListener('click', () => {
    const cartPopup = document.getElementById('cart-popup');
    cartPopup.style.display = 'block';
});

// Закриття корзини при кліку на хрестик
document.getElementById('close-cart-popup').addEventListener('click', () => {
    const cartPopup = document.getElementById('cart-popup');
    cartPopup.style.display = 'none';
});

// Перехід на головну сторінку і закриття popup
document.getElementById('back-to-home').addEventListener('click', () => {
    const cartPopup = document.getElementById('cart-popup');
    cartPopup.style.display = 'none';
});

// Переход на сторінку оплати (функцію checkout потрібно реалізувати окремо)
document.getElementById('checkout').addEventListener('click', () => {
    // Реалізуйте функціонал для переходу на сторінку оплати тут
    // Наприклад, можна використовувати window.location.href для переходу на іншу сторінку.
});

// Відображення списку товарів та корзини після завантаження сторінки
displayProducts();
displayCart();
