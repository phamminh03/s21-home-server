const passwordInput = document.getElementById("password");
const message = document.getElementById("msg");

async function login() {

    const password = passwordInput.value.trim();

    if (password === "") {
        message.textContent = "Vui lòng nhập mật khẩu";
        return;
    }

    message.textContent = "Đang đăng nhập...";

    try {

        const response = await fetch("/login", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                password: password
            })

        });

        const data = await response.json();

        if (data.success) {

            window.location.href = "/home";

        } else {

            message.textContent = data.message;

        }

    } catch (err) {

        message.textContent = "Không thể kết nối tới server";

    }

}
async function logout() {

    await fetch("/logout", {
        method: "POST"
    });

    window.location.href = "/";

}
