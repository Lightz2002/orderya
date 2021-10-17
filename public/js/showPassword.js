const eyeIcon = document.querySelector(".fa-eye");

eyeIcon.addEventListener("click", function () {
    const passwordInput = eyeIcon.previousElementSibling;

    if (passwordInput.type === "password") {
        passwordInput.type = "input";
        eyeIcon.classList.replace("fa-eye", "fa-eye-slash");
    } else {
        passwordInput.type = "password";
        eyeIcon.classList.replace("fa-eye-slash", "fa-eye");
    }
});
