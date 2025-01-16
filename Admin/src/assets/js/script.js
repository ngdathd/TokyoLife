const hamBurger = document.querySelector(".toggle-btn");
const sidebar = document.querySelector("#sidebar");

hamBurger.addEventListener("click", function () {
    if (sidebar.classList.contains("expand")) {
        sidebar.classList.remove("expand");
    } else {
        sidebar.classList.add("expand");
    }
});
