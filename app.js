// Data Storage
let dishes = [];
let orders = [];
let orderHistory = [];

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    loadFromLocalStorage();
    initializeDefaultDishes();
    renderMenuItems();
    renderOrderItems();
    renderOrderHistory();
});

// Initialize Default Dishes
function initializeDefaultDishes() {
    if (dishes.length === 0) {
        dishes = [
            { id: 1, name: 'Bún Bò Huế Bò Nạm', price: 40000 },
            { id: 2, name: 'Bún Bò Huế Bò Viên', price: 35000 },
            { id: 3, name: 'Bún Bò Huế Tôm', price: 45000 },
            { id: 4, name: 'Bún Bò Huế Cả Hai', price: 50000 },
            { id: 5, name: 'Bún Bò Huế Đặc Biệt', price: 55000 },
            { id: 6, name: 'Nước Dùng Bò (Lạnh)', price: 15000 },
            { id: 7, name: 'Nước Dùng Bò (Nóng)', price: 10000 },
            { id: 8, name: 'Rau Tươi', price: 5000 },
        ];
        saveToLocalStorage();
    }
}

// Render Menu Items
function renderMenuItems() {
    const menuContainer = document.getElementById('menuItems');
    menuContainer.innerHTML = '';

    dishes.forEach(dish => {
        const div = document.createElement('div');
        div.className = 'menu-item';
        div.innerHTML = `
            <div class="menu-item-info">
                <div class="menu-item-name">${dish.name}</div>
                <div class="menu-item-price">${formatPrice(dish.price)}</div>
            </div>
            <button class="menu-item-delete" onclick="deleteDish(${dish.id})">Xóa</button>
        `;
        div.onclick = (e) => {
            if (!e.target.classList.contains('menu-item-delete')) {
                addToOrder(dish);
            }
        };
        menuContainer.appendChild(div);
    });
}

// Add New Dish
function addNewDish() {
    const name = document.getElementById('dishName').value.trim();
    const price = parseFloat(document.getElementById('dishPrice').value);

    if (!name || !price || price < 0) {
        alert('Vui lòng nhập tên và giá hợp lệ!');
        return;
    }

    const newDish = {
        id: Date.now(),
        name: name,
        price: price
    };

    dishes.push(newDish);
    saveToLocalStorage();
    renderMenuItems();

    document.getElementById('dishName').value = '';
    document.getElementById('dishPrice').value = '';
    alert('Thêm món thành công!');
}

// Delete Dish
function deleteDish(id) {
    if (confirm('Bạn chắc chắn muốn xóa món này?')) {
        dishes = dishes.filter(d => d.id !== id);
        orders = orders.filter(o => o.dishId !== id);
        saveToLocalStorage();
        renderMenuItems();
        renderOrderItems();
        calculateTotal();
    }
}

// Add to Order
function addToOrder(dish) {
    const existingOrder = orders.find(o => o.dishId === dish.id);
    
    if (existingOrder) {
        existingOrder.quantity += 1;
    } else {
        orders.push({
            dishId: dish.id,
            name: dish.name,
            price: dish.price,
            quantity: 1
        });
    }

    renderOrderItems();
    calculateTotal();
}

// Render Order Items
function renderOrderItems() {
    const container = document.getElementById('orderItems');
    container.innerHTML = '';

    if (orders.length === 0) {
        container.innerHTML = '<tr><td colspan="5" style="text-align: center; color: #999;">Giỏ hàng trống</td></tr>';
        return;
    }

    orders.forEach((order, index) => {
        const total = order.price * order.quantity;
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${order.name}</td>
            <td>${formatPrice(order.price)}</td>
            <td>
                <input type="number" class="qty-input" value="${order.quantity}" min="1" 
                    onchange="updateQuantity(${index}, this.value)">
            </td>
            <td>${formatPrice(total)}</td>
            <td>
                <button class="btn-delete" onclick="removeFromOrder(${index})">Xóa</button>
            </td>
        `;
        container.appendChild(tr);
    });
}

// Update Quantity
function updateQuantity(index, quantity) {
    const qty = parseInt(quantity);
    if (qty > 0) {
        orders[index].quantity = qty;
        renderOrderItems();
        calculateTotal();
    }
}

// Remove from Order
function removeFromOrder(index) {
    orders.splice(index, 1);
    renderOrderItems();
    calculateTotal();
}

// Calculate Total
function calculateTotal() {
    let subtotal = 0;
    orders.forEach(order => {
        subtotal += order.price * order.quantity;
    });

    const discount = parseFloat(document.getElementById('discount').value) || 0;
    const discountAmount = subtotal * (discount / 100);
    const shipping = parseFloat(document.getElementById('shipping').value) || 0;
    const total = subtotal - discountAmount + shipping;

    document.getElementById('subtotal').value = formatPrice(subtotal);
    document.getElementById('discountAmount').value = formatPrice(discountAmount);
    document.getElementById('total').value = formatPrice(total);

    return { subtotal, discount, discountAmount, shipping, total };
}

// Print Bill
function printBill() {
    if (orders.length === 0) {
        alert('Giỏ hàng trống! Vui lòng thêm món ăn.');
        return;
    }

    const { subtotal, discount, discountAmount, shipping, total } = calculateTotal();
    const now = new Date();
    const timeString = now.toLocaleString('vi-VN');

    let billHTML = `
        <div class="bill-header">
            <h1>🍲 Quán Bún Bò Huế</h1>
            <p>Hóa Đơn Thanh Toán</p>
            <p style="font-size: 0.9em; margin-top: 10px;">Ngày: ${timeString}</p>
        </div>
        <div class="bill-items">
    `;

    orders.forEach(order => {
        const itemTotal = order.price * order.quantity;
        billHTML += `
            <div class="bill-item">
                <div class="bill-item-name">${order.name} x${order.quantity}</div>
                <div class="bill-item-price">${formatPrice(itemTotal)}</div>
            </div>
        `;
    });

    billHTML += `
        </div>
        <div class="bill-summary">
            <div class="bill-summary-row">
                <span>Tổng tiền hàng:</span>
                <span>${formatPrice(subtotal)}</span>
            </div>
    `;

    if (discount > 0) {
        billHTML += `
            <div class="bill-summary-row">
                <span>Chiết khấu (${discount}%):</span>
                <span>-${formatPrice(discountAmount)}</span>
            </div>
        `;
    }

    if (shipping > 0) {
        billHTML += `
            <div class="bill-summary-row">
                <span>Phí vận chuyển:</span>
                <span>+${formatPrice(shipping)}</span>
            </div>
        `;
    }

    billHTML += `
            <div class="bill-summary-row total">
                <span>TỔNG TIỀN:</span>
                <span>${formatPrice(total)}</span>
            </div>
        </div>
        <div class="bill-footer">
            <p>Cảm ơn quý khách!</p>
            <p>Vui lòng quay lại!</p>
        </div>
    `;

    document.getElementById('billContent').innerHTML = billHTML;
    document.getElementById('printModal').style.display = 'block';
}

// Close Print Modal
function closePrintModal() {
    document.getElementById('printModal').style.display = 'none';
}

// Save Order to History
function saveOrder() {
    if (orders.length === 0) {
        alert('Giỏ hàng trống! Không có gì để lưu.');
        return;
    }

    const { subtotal, discount, discountAmount, shipping, total } = calculateTotal();
    const now = new Date();
    
    const orderRecord = {
        id: Date.now(),
        time: now.toLocaleString('vi-VN'),
        items: JSON.parse(JSON.stringify(orders)),
        subtotal: subtotal,
        discount: discount,
        discountAmount: discountAmount,
        shipping: shipping,
        total: total
    };

    orderHistory.push(orderRecord);
    saveToLocalStorage();
    renderOrderHistory();
    resetOrder();
    alert('Lưu đơn hàng thành công!');
}

// Render Order History
function renderOrderHistory() {
    const container = document.getElementById('orderHistory');
    container.innerHTML = '';

    if (orderHistory.length === 0) {
        container.innerHTML = '<p style="color: #999;">Chưa có lịch sử đơn hàng</p>';
        return;
    }

    // Show latest 5 orders
    const recentOrders = orderHistory.slice(-5).reverse();
    recentOrders.forEach(record => {
        const itemsHTML = record.items.map(item => 
            `${item.name} x${item.quantity}`
        ).join(', ');

        const div = document.createElement('div');
        div.className = 'history-item';
        div.innerHTML = `
            <div class="history-item-header">
                <span class="history-item-time">${record.time}</span>
                <span class="history-item-total">${formatPrice(record.total)}</span>
            </div>
            <div class="history-item-content">${itemsHTML}</div>
        `;
        container.appendChild(div);
    });

    // Show total and count
    const totalRevenue = orderHistory.reduce((sum, order) => sum + order.total, 0);
    const summaryDiv = document.createElement('div');
    summaryDiv.className = 'history-item';
    summaryDiv.style.background = '#e8f5e9';
    summaryDiv.style.borderLeft = '4px solid #4caf50';
    summaryDiv.innerHTML = `
        <div class="history-item-header">
            <span><strong>Tổng số đơn:</strong> ${orderHistory.length}</span>
            <span style="color: #4caf50; font-weight: bold;">Tổng doanh thu: ${formatPrice(totalRevenue)}</span>
        </div>
    `;
    container.appendChild(summaryDiv);
}

// Reset Order
function resetOrder() {
    orders = [];
    renderOrderItems();
    document.getElementById('discount').value = '0';
    document.getElementById('shipping').value = '0';
    calculateTotal();
}

// Format Price
function formatPrice(price) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(price);
}

// Local Storage
function saveToLocalStorage() {
    localStorage.setItem('bunboAppData', JSON.stringify({
        dishes: dishes,
        orderHistory: orderHistory
    }));
}

function loadFromLocalStorage() {
    const data = localStorage.getItem('bunboAppData');
    if (data) {
        const parsed = JSON.parse(data);
        dishes = parsed.dishes || [];
        orderHistory = parsed.orderHistory || [];
    }
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('printModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}
