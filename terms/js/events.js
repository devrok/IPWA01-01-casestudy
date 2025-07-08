document
    .getElementById("searchForm")
    .addEventListener("submit", function (event) {

        event.preventDefault(); // Verhindert das Standardverhalten des Formulars

        window.eventListenerSearch();
    });