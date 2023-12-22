const loginButton = document.getElementById("login-btn")

loginButton.addEventListener("click", login)

async function login() {
    const email = document.getElementById("email")
    const password = document.getElementById("password")

    const request = new Request("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.parse({ email, password }),
    })

    const response = await fetch(request)
    const data = await response.json()

    if (data.success = false) {
        document.getElementById("passwordError").innerText = data.message;
    }
}