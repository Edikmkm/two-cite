document.addEventListener("DOMContentLoaded", () => {
  const products = [
    { id: 1, name: "Свободный худи", price: 2990, image: "https://picsum.photos/seed/hoodie/400/600 ", careInfo: "Не стирать при высоких температурах. Гладить аккуратно." },
    { id: 2, name: "Черные джоггеры", price: 2490, image: "https://picsum.photos/seed/pants/400/600 ", careInfo: "Рекомендуется ручная стирка. Не использовать отбеливатель." },
    { id: 3, name: "Олимпийка уличного стиля", price: 3490, image: "https://picsum.photos/seed/jacket/400/600 ", careInfo: "Машинная стирка при 30°C. Не сушить в сушилке." },
    { id: 4, name: "Футболка с принтом", price: 1290, image: "https://picsum.photos/seed/tshirt/400/600 ", careInfo: "Гладить через ткань. Не отбеливать." },
    { id: 5, name: "Бейсболка черная", price: 790, image: "https://picsum.photos/seed/cap/400/600 ", careInfo: "Протирать влажной тряпкой. Не стирать." },
    { id: 6, name: "Утепленные кроссовки", price: 4290, image: "https://picsum.photos/seed/shoes/400/600 ", careInfo: "Протирать мягкой тканью. Избегать длительного контакта с водой." }
  ];

  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
  }

  function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelectorAll('.cart-btn .cart-count').forEach(el => el.textContent = count);
    document.getElementById('cart-count').textContent = count;
    document.getElementById('mobile-cart-count').textContent = count;

    if (count === 0) {
      document.querySelectorAll('.cart-btn .cart-count').forEach(el => el.classList.add('hidden'));
      document.getElementById('cart-count').classList.add('hidden');
      document.getElementById('mobile-cart-count').classList.add('hidden');
    } else {
      document.querySelectorAll('.cart-btn .cart-count').forEach(el => el.classList.remove('hidden'));
      document.getElementById('cart-count').classList.remove('hidden');
      document.getElementById('mobile-cart-count').classList.remove('hidden');
    }
  }

  function renderHomePage() {
    const home = document.getElementById('home');
    home.innerHTML = `
      <section class="h-screen flex items-center justify-center bg-white">
        <div class="text-center px-6">
          <h2 class="text-4xl md:text-6xl font-bold text-gray-800 leading-tight max-w-3xl mx-auto">
            "Ты не идешь по законам мира — ты создаешь свои."
          </h2>
          <p class="mt-4 text-lg text-gray-600">two.</p>
        </div>
      </section>
      <section class="py-12 bg-gray-50 relative">
        <div class="container mx-auto px-4">
          <h3 class="text-2xl font-semibold mb-6">Популярное</h3>
          <div class="relative">
            <button onclick="scrollLeft()" class="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-black text-white p-2 rounded-full hidden md:block">&larr;</button>
            <div id="carousel" class="flex overflow-x-hidden snap-x snap-mandatory space-x-4 scrollbar-hide">
              ${products.slice(0, 3).map(p => `
                <div class="snap-start shrink-0 w-[300px] bg-white border rounded-lg shadow-md hover:shadow-xl transition-shadow cursor-pointer animate-pulse"
                     onclick="openModal(${p.id})">
                  <img src="${p.image}" alt="${p.name}" class="w-full h-64 object-cover" />
                  <div class="p-4">
                    <h4 class="font-semibold">${p.name}</h4>
                    <p class="text-red-600 font-bold">${p.price} ₽</p>
                    <button class="mt-2 w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition-colors" onclick="addToCart(${p.id}, event)">Добавить в корзину</button>
                  </div>
                </div>
              `).join('')}
            </div>
            <button onclick="scrollRight()" class="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-black text-white p-2 rounded-full hidden md:block">&rarr;</button>
          </div>
        </div>
      </section>
    `;
  }

  function renderCatalogPage() {
    const catalog = document.getElementById('catalog');
    catalog.innerHTML = `
      <div class="px-4 py-8 max-w-7xl mx-auto">
        <h2 class="text-3xl font-bold mb-6">Каталог</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          ${products.map(p => `
            <div class="border rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow cursor-pointer animate-pulse" onclick="openModal(${p.id})">
              <img src="${p.image}" alt="${p.name}" class="w-full h-64 object-cover" />
              <div class="p-4">
                <h3 class="font-semibold text-lg">${p.name}</h3>
                <p class="text-red-600 font-bold">${p.price} ₽</p>
                <div class="flex justify-between mt-2">
                  <button class="bg-black text-white py-1 px-3 rounded hover:bg-gray-800 transition-colors" onclick="addToCart(${p.id}, event)">+</button>
                  <button class="bg-gray-300 py-1 px-3 rounded hover:bg-gray-400 transition-colors" onclick="removeFromCart(${p.id}, event)">-</button>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  function renderDeliveryPage() {
    document.getElementById('delivery').innerHTML = `
      <div class="px-4 py-8 max-w-3xl mx-auto">
        <h2 class="text-3xl font-bold mb-6">Доставка</h2>
        <div class="bg-gray-100 p-6 rounded-lg shadow-md">
          <p class="mb-4">Мы доставляем ваш заказ быстро и надежно! После подтверждения оплаты товар будет отправлен в течение 1-3 рабочих дней.</p>
          <ul class="list-disc pl-6 space-y-2">
            <li>Бесплатная доставка при заказе от 5000 ₽</li>
            <li>Экспресс-доставка за 1 день — 500 ₽</li>
            <li>Стандартная доставка — 300 ₽</li>
            <li>Возможна доставка до пункта выдачи или курьером</li>
            <li>Отслеживание заказа доступно после отправки</li>
          </ul>
        </div>
      </div>
    `;
  }

  function renderAboutPage() {
    document.getElementById('about').innerHTML = `
      <div class="px-4 py-8 max-w-3xl mx-auto">
        <h2 class="text-3xl font-bold mb-6">О нас</h2>
        <div class="bg-gray-100 p-6 rounded-lg shadow-md">
          <p class="mb-4">Наш магазин имеет собственный цех пошива одежды, который находится в г. Уфа, Республика Башкортостан.</p>
          <p>Мы заботимся о клиентах и все изделия делаются из премиум ткани. Наши клиенты получают уникальный стиль, комфорт и качество.</p>
        </div>
      </div>
    `;
  }

  function renderCartPage() {
    const cartPage = document.getElementById('cart');
    const totalCost = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    if (cart.length === 0) {
      cartPage.innerHTML = `
        <div class="text-center py-10">
          <p class="text-xl">Ваша корзина пуста.</p>
          <button class="mt-4 bg-gray-500 text-white py-2 px-6 rounded hover:bg-gray-600 transition-colors" onclick="switchPage('catalog')">Перейти к покупкам</button>
        </div>
      `;
      return;
    }

    cartPage.innerHTML = `
      <div class="px-4 py-8 max-w-4xl mx-auto">
        <h2 class="text-3xl font-bold mb-6">Корзина</h2>
        <div class="space-y-4 mb-6">
          ${cart.map(item => `
            <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b pb-4">
              <div class="flex items-center mb-2 sm:mb-0">
                <img src="${item.image}" alt="${item.name}" class="w-16 h-20 object-cover mr-4" />
                <div>
                  <h4 class="font-semibold">${item.name}</h4>
                  <p class="text-red-600">${item.price} ₽</p>
                </div>
              </div>
              <div class="flex items-center space-x-2">
                <button class="bg-gray-300 py-1 px-3 rounded hover:bg-gray-400 transition-colors" onclick="updateQuantity(${item.id}, -1)">-</button>
                <span class="w-8 text-center">${item.quantity}</span>
                <button class="bg-gray-300 py-1 px-3 rounded hover:bg-gray-400 transition-colors" onclick="updateQuantity(${item.id}, 1)">+</button>
                <button class="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition-colors" onclick="removeProduct(${item.id})">×</button>
              </div>
            </div>
          `).join('')}
        </div>
        <div class="text-right font-bold text-xl mb-6">Общая сумма: ${totalCost} ₽</div>
        <form onsubmit="handleSubmit(event)">
          <h3 class="text-xl font-semibold mb-4">Информация для доставки</h3>
          <div class="space-y-4">
            <div>
              <label class="block mb-1">ФИО:</label>
              <input type="text" name="fullName" required class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-black" />
            </div>
            <div>
              <label class="block mb-1">Адрес доставки:</label>
              <input type="text" name="address" required class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-black" />
            </div>
            <div>
              <label class="block mb-1">Почтовый индекс:</label>
              <input type="text" name="postalCode" required class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-black" />
            </div>
            <div>
              <label class="block mb-1">Номер телефона:</label>
              <input type="tel" name="phone" required class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-black" />
            </div>
          </div>
          <div class="mt-6 flex justify-between">
            <button type="button" class="bg-gray-500 text-white py-2 px-6 rounded hover:bg-gray-600 transition-colors" onclick="switchPage('catalog')">Продолжить покупки</button>
            <button type="submit" class="bg-black text-white py-2 px-6 rounded hover:bg-gray-800 transition-colors">Оформить заказ</button>
          </div>
        </form>
      </div>
    `;
  }

  window.updateQuantity = (id, delta) => {
    const item = cart.find(i => i.id === id);
    if (item) {
      item.quantity += delta;
      if (item.quantity <= 0) {
        cart = cart.filter(i => i.id !== id);
      }
      saveCart();
      renderCartPage();
    }
  };

  window.handleSubmit = (e) => {
    e.preventDefault();
    alert("Заказ оформлен!");
    cart = [];
    saveCart();
    renderCartPage();
  };

  window.addToCart = (id, e) => {
    e.stopPropagation();
    const product = products.find(p => p.id === id);
    const existing = cart.find(i => i.id === id);
    if (existing) {
      existing.quantity++;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    saveCart();
    renderCartPage();
    showModal(product);
  };

  window.removeFromCart = (id, e) => {
    e.stopPropagation();
    cart = cart.filter(i => i.id !== id);
    saveCart();
    renderCartPage();
  };

  window.removeProduct = (id) => {
    cart = cart.filter(i => i.id !== id);
    saveCart();
    renderCartPage();
  };

  window.openModal = (id) => {
    const product = products.find(p => p.id === id);
    const modalContent = document.getElementById('modal-content');
    const inCart = cart.some(i => i.id === id);
    modalContent.innerHTML = `
      <div class="flex flex-col md:flex-row">
        <div class="md:w-1/2 mb-4 md:mb-0 md:pr-4">
          <img src="${product.image}" alt="${product.name}" class="w-full h-auto rounded" />
        </div>
        <div class="md:w-1/2">
          <h3 class="text-2xl font-bold mb-2">${product.name}</h3>
          <p class="text-red-600 font-bold text-xl mb-4">${product.price} ₽</p>
          <div class="mb-4">
            <h4 class="font-semibold mb-1">Рекомендации по уходу:</h4>
            <p class="text-sm">${product.careInfo}</p>
          </div>
          <div class="flex space-x-4">
            <button class="bg-black text-white py-2 px-6 rounded hover:bg-gray-800 transition-colors" onclick="addToCart(${product.id}, event)">
              ${inCart ? "Добавлено" : "Добавить в корзину"}
            </button>
            ${inCart ? `<button class="bg-gray-300 py-2 px-6 rounded hover:bg-gray-400 transition-colors" onclick="removeProduct(${product.id})">Убрать из корзины</button>` : ''}
          </div>
        </div>
      </div>
    `;
    document.getElementById('modal').classList.remove('hidden');
  };

  window.showModal = (product) => {
    const modalContent = document.getElementById('modal-content');
    const inCart = cart.some(i => i.id === product.id);
    modalContent.innerHTML = `
      <div class="flex flex-col md:flex-row">
        <div class="md:w-1/2 mb-4 md:mb-0 md:pr-4">
          <img src="${product.image}" alt="${product.name}" class="w-full h-auto rounded" />
        </div>
        <div class="md:w-1/2">
          <h3 class="text-2xl font-bold mb-2">${product.name}</h3>
          <p class="text-red-600 font-bold text-xl mb-4">${product.price} ₽</p>
          <div class="mb-4">
            <h4 class="font-semibold mb-1">Рекомендации по уходу:</h4>
            <p class="text-sm">${product.careInfo}</p>
          </div>
          <div class="flex space-x-4">
            <button class="bg-black text-white py-2 px-6 rounded hover:bg-gray-800 transition-colors" onclick="addToCart(${product.id}, event)">
              ${inCart ? "Добавлено" : "Добавить в корзину"}
            </button>
            ${inCart ? `<button class="bg-gray-300 py-2 px-6 rounded hover:bg-gray-400 transition-colors" onclick="removeProduct(${product.id})">Убрать из корзины</button>` : ''}
          </div>
        </div>
      </div>
    `;
    document.getElementById('modal').classList.remove('hidden');
  };

  window.closeModal = () => {
    document.getElementById('modal').classList.add('hidden');
  };

  window.scrollLeft = () => {
    document.getElementById('carousel').scrollBy({ left: -320, behavior: 'smooth' });
  };

  window.scrollRight = () => {
    document.getElementById('carousel').scrollBy({ left: 320, behavior: 'smooth' });
  };

  // Page switching logic
  window.switchPage = (page) => {
    document.querySelectorAll('.page').forEach(p => p.classList.add('hidden'));
    document.getElementById(page).classList.remove('hidden');
    document.querySelectorAll('.page-link').forEach(link => link.classList.remove('active'));
    document.querySelector(`[data-page="${page}"]`).classList.add('active');

    if (page === 'cart') renderCartPage();
    if (page === 'catalog') renderCatalogPage();
    if (page === 'delivery') renderDeliveryPage();
    if (page === 'about') renderAboutPage();
  };

  // Mobile menu toggle
  document.getElementById('menu-toggle').addEventListener('click', () => {
    document.getElementById('mobile-menu').classList.remove('translate-x-full');
    document.getElementById('overlay').classList.remove('hidden');
  });

  document.getElementById('close-menu').addEventListener('click', () => {
    document.getElementById('mobile-menu').classList.add('translate-x-full');
    document.getElementById('overlay').classList.add('hidden');
  });

  document.getElementById('overlay').addEventListener('click', () => {
    document.getElementById('mobile-menu').classList.add('translate-x-full');
    document.getElementById('overlay').classList.add('hidden');
  });

  document.querySelectorAll('[data-page]').forEach(button => {
    button.addEventListener('click', () => {
      const page = button.getAttribute('data-page');
      switchPage(page);
      document.getElementById('mobile-menu').classList.add('translate-x-full');
      document.getElementById('overlay').classList.add('hidden');
    });
  });

  // Close modal
  document.getElementById('modal-close').addEventListener('click', closeModal);

  // Initial render
  document.getElementById('year').textContent = new Date().getFullYear();
  updateCartCount();
  renderHomePage();
  renderCatalogPage();
  renderDeliveryPage();
  renderAboutPage();
});
