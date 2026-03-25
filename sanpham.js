function displayProducts() {
    const products = JSON.parse(localStorage.getItem("products")) || [];
    const displayContainer = document.getElementById("product-display");

    if (!displayContainer) return; // Bảo vệ nếu không tìm thấy ID

    // Nếu không có sản phẩm nào từ Admin, có thể hiện thông báo hoặc giữ sản phẩm mặc định
    if (products.length === 0) {
        displayContainer.innerHTML = "<p>Hiện chưa có sản phẩm mới nào từ Admin.</p>";
        return;
    }

    displayContainer.innerHTML = ""; // Xóa nội dung cũ để làm mới

    products.forEach((product, index) => {
        // Sử dụng class "product-card" để ăn theo CSS có sẵn trong sanpham.html
        displayContainer.innerHTML += `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <div class="price">${Number(product.price).toLocaleString()}đ</div>
                <button onclick="addToCart(${index})" class="buy-btn">Thêm vào giỏ</button>
            </div>
        `;
    });
}

// Hàm thêm vào giỏ hàng
function addToCart(index) {
    const products = JSON.parse(localStorage.getItem("products")) || [];
    const selectedProduct = products[index];

    // Lấy giỏ hàng hiện tại hoặc tạo mới nếu chưa có
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Thêm sản phẩm vừa chọn vào giỏ
    cart.push(selectedProduct);

    // Lưu lại vào localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Đã thêm " + selectedProduct.name + " vào giỏ hàng!");
}

// Chạy hàm hiển thị khi trang load
document.addEventListener("DOMContentLoaded", displayProducts);