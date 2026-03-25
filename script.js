
const navLinks = document.querySelectorAll(".nav-menu .nav-link")
const menuOpenButton = document.querySelector("#menu-open-button");
const menuCloseButton = document.querySelector("#menu-close-button");
menuOpenButton.addEventListener("click",()=>{
    document.body.classList.toggle("show-mobile-menu");
})

menuCloseButton.addEventListener("click",()=> menuOpenButton.click());


// close menu when the close button is clicker
navLinks.forEach(link =>{
    link.addEventListener("click",() =>menuOpenButton.click())
});


// Initialize Swiper 
const swiper = new Swiper('.slider-wrapper', {
  loop: true,
  grabCursor: true,
    spaceBetween: 25,
  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    dynamicBullets: true,
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
// responsive breakpoint
  breakpoints: {
    0: {
        slidesPerView:1
    },
     768:{
        slidesPerView:2
    },
     1024:{
        slidesPerView:3
    },
  }
});


// Kiểm tra khi trang web load xong
document.addEventListener("DOMContentLoaded", () => {
    checkLoginStatus();
});

function checkLoginStatus() {
    const currentUser = localStorage.getItem('currentUser');
    const authSection = document.getElementById('auth-section');
    const userInfo = document.getElementById('user-info');
    const userNameSpan = document.getElementById('user-name');

    if (currentUser && currentUser !== "null") {
        if (authSection) authSection.style.display = 'none';
        if (userInfo) userInfo.style.display = 'flex'; // Hiện khối user
        if (userNameSpan) userNameSpan.innerText = currentUser;
    } else {
        if (authSection) authSection.style.display = 'block';
        if (userInfo) userInfo.style.display = 'none';
    }
}

// Hàm xử lý việc click hiện/ẩn menu
function toggleUserMenu(event) {
    // Ngăn chặn sự kiện click lan ra ngoài (tránh kích hoạt window.onclick)
    event.stopPropagation(); 
    const menu = document.getElementById('user-menu');
    
    if (menu.style.display === "block") {
        menu.style.display = "none";
    } else {
        menu.style.display = "block";
    }
}

// Khi click bất kỳ đâu ngoài menu thì đóng menu
window.addEventListener('click', function() {
    const menu = document.getElementById('user-menu');
    if (menu) {
        menu.style.display = 'none';
    }
});

function logout() {
    localStorage.removeItem('currentUser');
    window.location.reload();
}

// Chạy kiểm tra đăng nhập khi load trang
document.addEventListener("DOMContentLoaded", checkLoginStatus);