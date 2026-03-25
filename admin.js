// // --- 1. KIỂM TRA QUYỀN TRUY CẬP (CHỈ ADMIN MỚI ĐƯỢC VÀO) ---
// document.addEventListener("DOMContentLoaded", () => {
//     const currentUser = localStorage.getItem('currentUser');
    
//     // Nếu không phải là tài khoản "admin", lập tức đẩy về trang login
//     if (currentUser !== "admin") {
//         alert("Bạn không có quyền truy cập vào trang quản trị!");
//         window.location.href = "login.html";
//         return;
//     }
    
//     // Nếu là admin, hiển thị dữ liệu ban đầu
//     showProducts();
//     updateDashboard();
//     showOrders();
//     showSection('dashboard'); // Mặc định hiện Dashboard khi mới vào
// });

//2. HÀM CHUYỂN ĐỔI GIỮA CÁC MỤC---
function showSection(sectionId) {
    // Ẩn tất cả các phần nội dung (sections)
    const sections = document.querySelectorAll('.section');
    sections.forEach(sec => sec.style.display = 'none');

    // Hiển thị phần được chọn
    const target = document.getElementById(sectionId);
    if (target) {
        target.style.display = 'block';
    }

    // Cập nhật lại số liệu nếu vào Dashboard hoặc Đơn hàng
    if (sectionId === 'dashboard') updateDashboard();
    if (sectionId === 'orders') showOrders();
}

// --- 3. QUẢN LÝ SẢN PHẨM ---
function getProducts() {
    return JSON.parse(localStorage.getItem("products")) || [];
}

function saveProducts(products) {
    localStorage.setItem("products", JSON.stringify(products));
}

function addProduct() {
    const name = document.getElementById("name").value;
    const price = document.getElementById("price").value;
    const fileInput = document.getElementById("image");
    const file = fileInput.files[0];

    if (!name || !price || !file) {
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        const image = e.target.result;
        const products = getProducts();

        products.push({
            name: name,
            price: price,
            image: image
        });

        saveProducts(products);
        alert("Thêm sản phẩm thành công!");
        
        // Reset form
        document.getElementById("name").value = "";
        document.getElementById("price").value = "";
        fileInput.value = "";

        showProducts();
        updateDashboard();
    };
    reader.readAsDataURL(file);
}

function deleteProduct(index) {
    if (confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
        const products = getProducts();
        products.splice(index, 1);
        saveProducts(products);
        showProducts();
        updateDashboard();
    }
}

function showProducts() {
    const products = getProducts();
    const list = document.getElementById("product-list");
    if (!list) return;

    list.innerHTML = "";
    products.forEach((p, i) => {
        list.innerHTML += `
            <div class="product-item">
                <img src="${p.image}">
                <h4>${p.name}</h4>
                <p>${Number(p.price).toLocaleString()}đ</p>
                <button onclick="deleteProduct(${i})">Xóa</button>
            </div>
        `;
    });
}

// --- 4. QUẢN LÝ ĐƠN HÀNG ---
function showOrders() {
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    const list = document.getElementById("order-list");
    
    // Nếu bạn chưa có thẻ <div id="order-list"></div> trong admin.html thì code này sẽ không hiện gì
    if (!list) return;

    list.innerHTML = "<h2>Danh sách đơn đặt hàng</h2>";

    if (orders.length === 0) {
        list.innerHTML += "<p>Chưa có đơn hàng nào.</p>";
        return;
    }

    orders.forEach((order, index) => {
        list.innerHTML += `
            <div class="card" style="width: 100%; margin-bottom: 20px; border-left: 5px solid #3b141c;">
                <h3>Đơn hàng #${index + 1}</h3>
                <p><b>Khách hàng:</b> ${order.customer || 'Khách vãng lai'}</p>
                <p><b>Tổng tiền:</b> <span style="color: #f3961c;">${order.totalPrice}đ</span></p>
                <hr>
                <p>Sản phẩm: ${order.items.map(item => item.name).join(", ")}</p>
            </div>
        `;
    });
}

// --- 5. THỐNG KÊ (DASHBOARD) ---
function updateDashboard() {
    const products = getProducts();
    const totalProductEl = document.getElementById("total-product");
    if (totalProductEl) {
        totalProductEl.innerText = products.length;
    }
}