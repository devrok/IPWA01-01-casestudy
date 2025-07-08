document.addEventListener("DOMContentLoaded", () => {
    window.changeDirectionOfElement("#dirContainerId");
    console.log("site loaded");
});

document
    .getElementById("searchForm")
    .addEventListener("submit", function (event) {

        event.preventDefault(); // Verhindert das Standardverhalten des Formulars

        window.eventListenerSearch();
        // const searchInput = document.getElementById("searchInput");
        // const searchTerm = window.escapeHtml(searchInput.value.trim());
        // const searchResult = window.getElementById("searchResult");

        // if (searchTerm) {
        //     // Hier könnte eine echte Suchfunktion implementiert werden
        //     //document.getElementById("searchResult").innerHTML = `Suchergebnisse für: <strong>${searchTerm}</strong>`;
        //     // mit innerText ist eine Verwendung von HTML nicht möglich
        //     searchResult.innerText = `Suchergebnisse für: ${searchTerm}`;
        //     searchResult.style.display = "block";
        // } else {
        //     searchResult.style.display = "none";
        // }
    });
