document.addEventListener("DOMContentLoaded", () => {
    renderProducts();
});

function renderProducts() {
    const displayList = document.getElementById("product-display-list");
    if (!displayList) return;

    // 1. Lấy danh sách sản phẩm từ localStorage
    const products = JSON.parse(localStorage.getItem("products")) || [];

    // 2. Nếu không có sản phẩm nào
    if (products.length === 0) {
        displayList.innerHTML = "<p>Hiện chưa có sản phẩm nào trong cửa hàng.</p>";
        return;
    }

    // 3. Vẽ sản phẩm ra màn hình (Sử dụng class CSS của bạn để giữ giao diện đẹp)
    displayList.innerHTML = ""; // Xóa nội dung cũ
    products.forEach((p) => {
        displayList.innerHTML += `
            <div class="menu-item">
                <img src="${p.image}" alt="${p.name}" class="menu-image">
                <div class="menu-details">
                    <h3 class="name">${p.name}</h3>
                    <p class="price">${p.price}đ</p>
                    <button class="add-to-cart-btn" onclick="addToCart('${p.name}', '${p.price}', '${p.image}')">
                        Thêm vào giỏ
                    </button>
                </div>
            </div>
        `;
    });
}