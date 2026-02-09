// نمونه داده‌های قطعات (در واقعیت این داده‌ها از سایت شرکت گرفته می‌شود)
const sampleParts = [
    { code: "BRK001", name: "لنت ترمز جلو", category: "توقف", price: 450000 },
    { code: "FLT001", name: "فیلتر هوا موتور", category: "موتور", price: 85000 },
    { code: "OIL002", name: "روغن موتور 5W30", category: "موتور", price: 320000 },
    { code: "BAT001", name: "باتری 60 آمپر", category: "الکتریکال", price: 2800000 },
    { code: "TIR001", name: "لاستیک 205/55R16", category: "لاستیک", price: 1850000 },
    { code: "LMP001", name: "لامپ جلو LED", category: "نور", price: 350000 },
    { code: "BRK002", name: "دیسک ترمز", category: "توقف", price: 1200000 },
    { code: "FLT002", name: "فیلتر روغن", category: "موتور", price: 65000 },
    { code: "SUS001", name: "کمک فنر جلو", category: "تعلیق", price: 1850000 },
];

let cart = [];
let currentParts = [];

function simulateLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const siteUrl = document.getElementById('site-url').value;
    
    if (!username || !password || !siteUrl) {
        alert('لطفاً تمام فیلدها را پر کنید');
        return;
    }
    
    // در واقعیت اینجا باید با سایت شرکت ارتباط برقرار شود
    console.log('در حال ورود به:', siteUrl);
    
    // نمایش بخش اصلی
    document.querySelector('.login-section').classList.add('hidden');
    document.querySelector('.main-section').classList.remove('hidden');
    
    alert('ورود موفقیت‌آمیز بود!');
}

function loadCatalog() {
    const chassisNumber = document.getElementById('chassis-number').value;
    
    if (!chassisNumber) {
        alert('لطفاً شماره شاسی را وارد کنید');
        return;
    }
    
    // نمایش وضعیت در حال بارگذاری
    const partsList = document.getElementById('parts-list');
    partsList.innerHTML = '<div class="loading">در حال بارگذاری کاتالوگ...</div>';
    
    // شبیه‌سازی تاخیر برای بارگذاری
    setTimeout(() => {
        // در واقعیت اینجا باید با API سایت شرکت ارتباط برقرار شود
        // و بر اساس شماره شاسی، قطعات مربوطه را بگیرد
        currentParts = [...sampleParts];
        displayParts(currentParts);
        
        alert(`کاتالوگ برای شماره شاسی ${chassisNumber} بارگذاری شد`);
    }, 1500);
}

function displayParts(parts) {
    const partsList = document.getElementById('parts-list');
    partsList.innerHTML = '';
    
    parts.forEach(part => {
        const partElement = document.createElement('div');
        partElement.className = 'part-item';
        partElement.innerHTML = `
            <div class="part-header">
                <span class="part-code">${part.code}</span>
                <span class="part-category">${part.category}</span>
            </div>
            <div class="part-name">${part.name}</div>
            <div class="quantity-controls">
                <label>تعداد:</label>
                <input type="number" id="qty-${part.code}" value="1" min="1" max="100">
                <button onclick="addToCart('${part.code}', '${part.name}')">افزودن</button>
            </div>
            <div class="inventory-info">
                <span>قیمت: ${part.price.toLocaleString()} تومان</span>
                <button onclick="checkInventory('${part.code}')">بررسی موجودی</button>
            </div>
        `;
        partsList.appendChild(partElement);
    });
}

function searchParts() {
    const searchTerm = document.getElementById('search-parts').value.toLowerCase();
    
    if (!searchTerm) {
        displayParts(currentParts);
        return;
    }
    
    const filteredParts = currentParts.filter(part => 
        part.name.toLowerCase().includes(searchTerm) ||
        part.code.toLowerCase().includes(searchTerm) ||
        part.category.toLowerCase().includes(searchTerm)
    );
    
    displayParts(filteredParts);
}

function addToCart(code, name) {
    const quantityInput = document.getElementById(`qty-${code}`);
    const quantity = parseInt(quantityInput.value) || 1;
    
    const existingItem = cart.find(item => item.code === code);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            code,
            name,
            quantity,
            addedAt: new Date().toLocaleTimeString('fa-IR')
        });
    }
    
    updateCartDisplay();
    alert(`${quantity} عدد ${name} به سبد اضافه شد`);
}

function checkInventory(code) {
    // در واقعیت اینجا باید با سایت شرکت ارتباط برقرار شود
    // و موجودی واقعی را چک کند
    const randomInventory = Math.floor(Math.random() * 50) + 10; // موجودی تصادفی
    
    alert(`موجودی قطعه ${code}: ${randomInventory} عدد در انبار`);
}

function updateCartDisplay() {
    const cartItems = document.getElementById('cart-items');
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<div style="text-align: center; color: #666; padding: 20px;">سبد خالی است</div>';
        return;
    }
    
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div>
                <strong>${item.name}</strong><br>
                <small>کد: ${item.code}</small>
            </div>
            <div style="text-align: center;">
                <div>تعداد: ${item.quantity}</div>
                <small style="color: #666;">${item.addedAt}</small>
            </div>
            <div>
                <button onclick="removeFromCart('${item.code}')" style="background: #dc3545; padding: 8px 15px; font-size: 14px;">حذف</button>
            </div>
        </div>
    `).join('');
}

function removeFromCart(code) {
    cart = cart.filter(item => item.code !== code);
    updateCartDisplay();
}

// ویژگی‌های اولیه
document.addEventListener('DOMContentLoaded', function() {
    // می‌توانید مقادیر پیش‌فرض برای تست قرار دهید
    document.getElementById('site-url').value = 'https://company-auto-parts.com';
});
