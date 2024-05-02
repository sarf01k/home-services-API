document.addEventListener('DOMContentLoaded', function() {
    const signUpButton = document.getElementById("sign-up-btn");

    signUpButton.addEventListener("click", signUp);

    async function signUp(event) {
        event.preventDefault();
        const first_name = document.getElementById("first-name").value;
        const last_name = document.getElementById("last-name").value;
        const phone = document.getElementById("phone").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        document.getElementById("signUpError").innerText = '';

        const request = new Request("/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ first_name, last_name, phone, email, password }),
        });

        try {
            const response = await fetch(request);
            const contentType = response.headers.get('Content-Type');

            if (contentType && contentType.includes('application/json')) {
                // If the response is JSON, parse it
                const data = await response.json();

                if (!response.ok || response.status === 302 || response.status === 303) {
                    document.getElementById("signUpError").innerText = `* ${data.message}`;
                    const errorMessage = document.querySelector('.error-message');
                    errorMessage.style.visibility = 'visible';
                }
            } else {
                window.location.href = "/api/home";
            }
        } catch (error) {
            console.error(`Error:\n${error}`);
        }
    }
});