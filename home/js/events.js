document.addEventListener("DOMContentLoaded", () => {
    window.changeDirectionOfElement("#dirContainerId");
    console.log("site loaded");
});

document
    .getElementById("searchForm")
    .addEventListener("submit", function (event) {

        event.preventDefault(); // Verhindert das Standardverhalten des Formulars

        window.eventListenerSearch();
    });
