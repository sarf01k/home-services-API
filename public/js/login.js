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
            const contentType = response.headers.get('Content-Type');

            if (contentType && contentType.includes('application/json')) {
                // If the response is JSON, parse it
                const data = await response.json();

                if (!response.ok) {
                    document.getElementById("loginError").innerText = `* ${data.message}`;
                    const errorMessage = document.querySelector('.error-message');
                    errorMessage.style.visibility = 'visible';
                }
            } else {
                // If the response is not JSON, treat it as HTML
                const htmlResponse = await response.text();
                document.body.innerHTML = htmlResponse;
            }
        } catch (error) {
            console.error(`Error:\n${error}`);
        }
    }
});