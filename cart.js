function loadCart(){

const cart = JSON.parse(localStorage.getItem("cart")) || []

const list = document.getElementById("cart-list")

const totalEl = document.getElementById("total")

list.innerHTML=""

let total = 0

cart.forEach((item,i)=>{

total += parseInt(item.price)

list.innerHTML += `

<div class="cart-item">

<img src="${item.image}" width="80">

<div>
<h3>${item.name}</h3>
<p>${item.price}đ</p>
</div>

<button onclick="removeItem(${i})">X</button>

</div>

`

})

totalEl.innerText = "Tổng tiền: " + total + "đ"

}

function addToCart(name,price,image){

let cart = JSON.parse(localStorage.getItem("cart")) || []

cart.push({
name:name,
price:price,
image:image
})

localStorage.setItem("cart",JSON.stringify(cart))

alert("Đã thêm vào giỏ hàng")

}

function removeItem(index){

let cart = JSON.parse(localStorage.getItem("cart")) || []

cart.splice(index,1)

localStorage.setItem("cart",JSON.stringify(cart))

loadCart()

}

function order(){

alert("🎉 Đặt hàng thành công!")

localStorage.removeItem("cart")
window.location.href = "sanpham.html"

loadCart()

}

loadCart()

//xác nhận địa chỉ
// Bước 1: Mở Modal khi nhấn nút "Đặt hàng" ban đầu
function order() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length === 0) {
        alert("Giỏ hàng của bạn đang trống!");
        return;
    }
    document.getElementById("order-modal").style.display = "flex";
}

function closeModal() {
    document.getElementById("order-modal").style.display = "none";
}

// Bước 2: Xác nhận và hoàn tất
function confirmOrder() {
    const address = document.getElementById("customer-address").value;
    const phone = document.getElementById("customer-phone").value;

    // Kiểm tra xem đã nhập đủ chưa
    if (!address || !phone) {
        alert("Vui lòng nhập đầy đủ địa chỉ và số điện thoại!");
        return;
    }

    // Kiểm tra định dạng số điện thoại đơn giản (ít nhất 10 số)
    if (phone.length < 10) {
        alert("Số điện thoại không hợp lệ!");
        return;
    }

    const cart = JSON.parse(localStorage.getItem("cart"));
    const total = document.getElementById("total").innerText;

    // Tạo đối tượng đơn hàng (để bạn có thể quản lý sau này)
    const orderData = {
        customer: localStorage.getItem("currentUser"),
        address: address,
        phone: phone,
        items: cart,
        total: total,
        date: new Date().toLocaleString()
    };

    console.log("Đơn hàng mới:", orderData); // Bạn có thể lưu cái này vào localStorage 'orders' nếu muốn

    alert(`Đặt hàng thành công!\nĐơn hàng sẽ được giao đến: ${address}\nSĐT: ${phone}`);
    
    // Xóa giỏ hàng và về trang chủ
    localStorage.removeItem("cart");
    window.location.href = "index.html";
}