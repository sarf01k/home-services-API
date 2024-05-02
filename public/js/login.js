document.addEventListener('DOMContentLoaded', function() {
    const loginButton = document.getElementById("login-btn");

    loginButton.addEventListener("click", login);

    async function login(event) {
        event.preventDefault();
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const request = new Request("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        try {
            const response = await fetch(request);
            const contentType = response.headers.get('Content-Type');

            if (response.ok) {
                if (contentType && contentType.includes("application/json")) {

                    const data = await response.json();
                    console.log(data);

                } else {
                    console.log("Non-JSON response");
                    window.location.href = "/api/home";
                }
            } else {
                const data = await response.json();
                console.log(data);
                document.getElementById("loginError").innerText = `* ${data.message}`;
                const errorMessage = document.querySelector(".error-message");
                errorMessage.style.visibility = "visible";
            }

        } catch (error) {
            console.error(`Error:\n${error}`);
        }
    }
});