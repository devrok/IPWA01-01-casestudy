function eventListenerSearch() {
    const searchInput = window.getElementById("searchInput");
    const escapedSearchTerm = window.escapeHtml(searchInput.value.trim());
    const searchResult = window.getElementById("searchResult");

    if (escapedSearchTerm) {
        // Hier könnte eine echte Suchfunktion implementiert werden
        //document.getElementById("searchResult").innerHTML = `Suchergebnisse für: <strong>${searchTerm}</strong>`;
        // mit innerText ist eine Verwendung von HTML nicht möglich
        searchResult.textContent = `Suchergebnisse für: ${escapedSearchTerm}`;
        searchResult.style.display = "block";
    } else {
        searchResult.style.display = "none";
    }
}
window.eventListenerSearch = eventListenerSearch;
