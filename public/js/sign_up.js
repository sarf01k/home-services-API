document.addEventListener('DOMContentLoaded', function() {
    const signUpButton = document.getElementById("sign-up-btn");

    signUpButton.addEventListener("click", signUp);

    async function signUp(event) {
        event.preventDefault();
        const first_name = document.getElementById("first-name").value;
        const last_name = document.getElementById("last-name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        document.getElementById("signUpError").innerText = '';

        const request = new Request("http://localhost:5000/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ first_name, last_name, email, password }),
        });

        try {
            console.log(first_name);
        console.log(last_name);
        console.log(email);
        console.log(password);
            const response = await fetch(request);
            const contentType = response.headers.get('Content-Type');

            if (contentType && contentType.includes('application/json')) {
                // If the response is JSON, parse it
                const data = await response.json();

                if (!response.ok) {
                    document.getElementById("signUpError").innerText = `* ${data.message}`;
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