document.addEventListener('DOMContentLoaded', function() {
    const saveButton = document.getElementById("save-changes-btn");

    saveButton.addEventListener("click", editProfile)

    async function editProfile(event) {
        event.preventDefault();
        const first_name = document.getElementById("first-name").value;
        const last_name = document.getElementById("last-name").value
        const phone = document.getElementById("phone").value;
        const email = document.getElementById("email").value

        const request = new Request("/profile", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ first_name, last_name, phone, email }),
        });

        try {
            const response = await fetch(request);
            const contentType = response.headers.get("Content-Type");

            if (response.ok) {
                if (contentType && contentType.includes("application/json")) {
                    const data = await response.json();
                    console.log(data);
                } else {
                    console.log("Non-JSON response");
                    window.location.href = "/home";
                }
            } else {
                const data = await response.json;
                console.log(data);
                document.getElementById("edit-error").innerText = `* ${data.message}`;
                const errorMessage = document.querySelector(".error-message");
                errorMessage.style.visibility = "visible";
            }
        } catch (error) {
            console.error(`Error:\n${error}`);
        }
    }
})