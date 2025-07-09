document
    .getElementById("searchForm")
    .addEventListener("submit", function (event) {
        event.preventDefault(); // Verhindert das Standardverhalten des Formulars

        window.eventListenerSearch();
    });

document.addEventListener("DOMContentLoaded", async () => {
    window.changeDirectionOfElement("#dirContainerId");
    console.log("site loaded");

    // lade Daten aus den JSON-Dateien
    const countriesData = await window.loadData("../data/countries.json");
    const companiesData = await window.loadData("../data/companies.json");

    // update Text für die Gesamtanzahl der Datensätze
    updateTextTotalDataItems(countriesData, companiesData);

    // extrahiere die Jahreszahlen aus den Ländern
    const countryYears = Array.from(
        new Set(countriesData.map((country) => country.Year))
    ).sort((a, b) => b - a);
    // extrahierde die Jahreszahlen aus den Unternehmen
    const companyYears = Array.from(
        new Set(companiesData.map((company) => company.year))
    ).sort((a, b) => b - a);

    console.log("Jahreszahlen Länder:", countryYears);
    console.log("Jahreszahlen Unternehmen:", companyYears);

    // initialisiere die ComboBox für die Jahreszahlen mit Länderdaten
    initializeYearSelector("countries", countryYears, companyYears);

    // initialisiere die ComboBox für die Jahreszahlen, abhängig von der Änderung der Auswahl
    // Event-Listener für die Änderung der Auswahl in der Radio-Button-Gruppe
    document.querySelectorAll('input[name="dataType"]').forEach((input) => {
        input.addEventListener("change", () => {
            const selectedDataType = document.querySelector(
                'input[name="dataType"]:checked'
            ).value;
            initializeYearSelector(
                selectedDataType,
                countryYears,
                companyYears
            );

            onSelectionChanged(countriesData, companiesData);
        });
    });

    // Event-Listener für die Änderung der ausgewählten Jahreszahl
    const yearSelect = getElementById("yearSelect");

    yearSelect.addEventListener("change", () => {
        onSelectionChanged(countriesData, companiesData);
    });

    // initialisiere die ComboBox für die Jahreszahlen mit Länderdaten
    initializeYearSelector("countries", countryYears, companyYears);
});

function onSelectionChanged(countriesData, companiesData) {
    const selectedYear = getElementById("yearSelect").value;
    const selectedDataType = document.querySelector(
        'input[name="dataType"]:checked'
    ).value;
    console.log(
        `Ausgewähltes Jahr: ${selectedYear}, Datentyp: ${selectedDataType}`
    );

    const dataToRender =
        selectedDataType === "countries" ? countriesData : companiesData;
    window.renderTable(selectedDataType, selectedYear, dataToRender);
}

function initializeYearSelector(selectedDataType, countryYears, companyYears) {
    if (selectedDataType === "countries") {
        initializeYearSelectorByYears(countryYears);
    } else {
        initializeYearSelectorByYears(companyYears);
    }
}

function initializeYearSelectorByYears(years) {
    const yearSelect = getElementById("yearSelect");

    yearSelect.innerHTML = ""; // leere die ComboBox

    // für jedes Jahr in der Liste ein neues Option-Element erstellen
    years.forEach((year) => {
        const option = document.createElement("option");
        option.value = year;
        option.textContent = year;
        yearSelect.appendChild(option);
    });

    // Setze den ersten Eintrag als ausgewählt
    if (years.length > 0) {
        yearSelect.value = years[0];
    }
}

function updateTextTotalDataItems(countriesData, companiesData) {
    const totalDataItems = countriesData.length + companiesData.length;

    const element = getElementById("totalDataItems");
    const language = getLanguage();

    element.innerText = totalDataItems.toLocaleString(language);
}
