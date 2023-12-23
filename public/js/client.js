document.addEventListener('DOMContentLoaded', function() {
    const loginButton = document.getElementById("login-btn");

    loginButton.addEventListener("click", login);

    async function login(event) {
        event.preventDefault();
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        document.getElementById("loginError").innerText = '';

        const request = new Request("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        try {
            const response = await fetch(request);
            const data = await response.json();
            // console.log(data);

            if (!response.ok) {
                document.getElementById("loginError").innerText = `* ${data.message}`;
                const errorMessage = document.querySelector('.error-message');
                errorMessage.style.visibility = 'visible';
            }
        } catch (error) {
            console.error(`Error:\n${error}`);
        }
    }
});
