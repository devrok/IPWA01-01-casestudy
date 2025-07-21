document
    .getElementById("searchForm")
    .addEventListener("submit", function (event) {
        // Verhindert das Standardverhalten des Formulars
        event.preventDefault();

        window.eventListenerSearch();
    });

function showError(input, message) {
    input.classList.add("is-invalid");
    let error = input.nextElementSibling;
    if (!error || !error.classList.contains("text-danger")) {
        error = document.createElement("div");
        error.className = "text-danger";
        input.parentNode.insertBefore(error, input.nextSibling);
    }
    error.textContent = message;
}

function clearError(input) {
    input.classList.remove("is-invalid");
    const error = input.nextElementSibling;
    if (error && error.classList.contains("text-danger")) {
        error.textContent = "";
    }
}

function validateField(input) {
    const value = input.value.trim();

    if (!value) {
        showError(input, "Dieses Feld ist erforderlich.");
        return false;
    }

    if (value.length < 2) {
        showError(input, "Dieses Feld muss mindestens 2 Zeichen lang sein.");
        return false;
    }

    if (input.type === "email") {
        if (!window.validateEmail(value)) {
            showError(input, "Eine gültige E-Mail-Adresse ist erforderlich.");
            return false;
        }
    }

    clearError(input);
    return true;
}

function validateForm(inputs, submitButton) {
    let isValid = true;

    inputs.forEach((input) => {
        if (!validateField(input)) {
            isValid = false;
        }
    });

    submitButton.disabled = !isValid;
    return isValid;
}

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");
    // nur Eingabefelder des Formulars
    const inputs = form.querySelectorAll("input, textarea");
    const submitButton = form.querySelector("button[type='submit']");

    inputs.forEach((input) => {
        input.addEventListener("blur", () => {
            validateField(input);
            validateForm(inputs, submitButton);
        });

        input.addEventListener("input", () => {
            validateField(input);
            validateForm(inputs, submitButton);
        });
    });

    form.addEventListener("submit", (e) => {
        // Verhindert das Standardverhalten, also das tatsächliche Senden des Formulars
        e.preventDefault();

        if (validateForm(inputs, submitButton)) {
            // Eingaben escapen
            const formData = {};
            inputs.forEach((input) => {
                formData[input.name] = window.escapeHtml(input.value);
            });

            // das formData-Objekt mit dem escapeden Inhalten
            // könnte hier nun an den Server gesendet werden

            const toastElement = window.getElementById("formToast");
            const toast = new bootstrap.Toast(toastElement);
            toast.show();

            form.reset();
            submitButton.disabled = true; // Button deaktivieren
        }
    });

    // Initiale Validierung
    validateForm(inputs, submitButton);
});
