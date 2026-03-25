

// login
  const container = document.querySelector('.container');
  const registerbtn = document.querySelector('.register-btn');
  const loginbtn = document.querySelector('.login-btn');

  registerbtn.addEventListener('click', () => {
    container.classList.add('active');
  });

  loginbtn.addEventListener('click',() => {
    container.classList.remove('active');
  });

  // register
const registerForm = document.querySelector('.form-box.register form');

registerForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Lấy giá trị người dùng nhập vào
    const username = registerForm.querySelector('input[placeholder="Tên đăng nhập"]').value;
    const email = registerForm.querySelector('input[type="email"]').value;
    const password = registerForm.querySelector('input[placeholder="vui lòng nhập mật khẩu"]').value;
    const confirmPass = registerForm.querySelector('input[placeholder="nhập lại mật khẩu"]').value;

    // Kiểm tra mật khẩu khớp nhau không
 if (!email.toLowerCase().endsWith('@gmail.com')) {
        alert("Email phải có định dạng @gmail.com!");
        return; // Dừng xử lý
    }

    // 3. RÀNG BUỘC MẬT KHẨU: Chữ hoa, chữ thường, số, ký tự đặc biệt, ít nhất 8 ký tự
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
        alert("Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt!");
        return; // Dừng xử lý
    }

    // 4. Kiểm tra mật khẩu khớp nhau (Logic cũ của bạn)
    if (password !== confirmPass) {
        alert("Mật khẩu nhập lại không khớp!");
        return;
    }

    // 5. Nếu vượt qua tất cả các bước trên thì mới lưu vào localStorage
    localStorage.setItem(username, password);

    alert("Đăng ký thành công! Bây giờ bạn có thể đăng nhập.");
    
    // Tự động chuyển về form đăng nhập
    if (container) {
        container.classList.remove('active');
    }
});

//login
const loginForm = document.querySelector('.form-box.login form');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = loginForm.querySelector('input[type="text"]').value;
    const password = loginForm.querySelector('input[type="password"]').value;

    // Lấy mật khẩu đã lưu trong máy dựa trên tên đăng nhập
    const savedPassword = localStorage.getItem(username);

    if (savedPassword === null) {
        // Nếu không tìm thấy tên đăng nhập trong localStorage
        alert("Tài khoản không tồn tại. Vui lòng đăng ký trước!");
    } else if (savedPassword === password) {
        // Nếu tìm thấy và mật khẩu khớp
        localStorage.setItem('currentUser', username);
        alert("Đăng nhập thành công!");
        window.location.href = "index.html"; // Chuyển trang
    } else {
        // Nếu tên đăng nhập đúng nhưng mật khẩu sai
        alert("Sai mật khẩu. Vui lòng thử lại!");
    }
});
