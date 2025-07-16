
let dataTableInstance = null;
/*
 * Funktion um eine DataTable zu initialisieren
 * @param {string} selectedDataType - Der Typ der Daten, die angezeigt werden sollen
 */
function initializeDataTable(selectedDataType) {
    destroyDataTable();

    const options = selectedDataType === "companies"
        ? createOptionsCompanies([])
        : createOptionsCountries([]);

    dataTableInstance = new simpleDatatables.DataTable("#dataTable", options);
}
window.initializeDataTable = initializeDataTable;

/*
 * Funktion um die Tabelle mit den Daten zu rendern
 * @param {string} selectedDataType - Der Typ der Daten, die angezeigt werden sollen
 * @param {string} selectedYear - Das ausgewählte Jahr
 * @param {Array} data - Die Daten, die in der Tabelle angezeigt werden sollen
 */
async function renderTable(selectedDataType, selectedYear, data) {
    destroyDataTable();

    const year = parseInt(selectedYear, 10);
    const key = selectedDataType === "countries" ? "Year" : "year";
    const filteredData = data.filter((item) => item[key] === year);
    console.log("Gefilterte Daten:", filteredData.length);
    const options = selectedDataType === "countries"
        ? createOptionsCountries(filteredData)
        : createOptionsCompanies(filteredData);

    dataTableInstance = new simpleDatatables.DataTable("#dataTable", options);
}
window.renderTable = renderTable;

function destroyDataTable() {
    if (dataTableInstance) {
        dataTableInstance.destroy();
        dataTableInstance = null;
    }
    // Optional: Tabelle leeren
    const table = getElementById("dataTable");
    table.innerHTML = "";
}

function createOptionsCountries(dataSource) {
    const numberFormatter = new Intl.NumberFormat(window.getLanguage());
    // simple-datatables erwartet ein Array von Arrays für data, und ein Array für die Header
    const headers = ["Land", "ISO", "Jahr", "CO₂ (t)"];
    const data = dataSource.map(row => [
        row.Entity,
        row.Code,
        row.Year,
        numberFormatter.format(row.emissions_billiontons)
    ]);

    return {
        data: {
            headings: headers,
            data: data
        },
        perPage: 10,
        perPageSelect: [10, 25, 50],
        searchable: true,
        sortable: true,
        labels: {
            placeholder: "Suchen...",
            perPage: "Einträge pro Seite",
            noRows: "Keine Daten verfügbar.",
            info: "Zeige {start} bis {end} von {rows} Einträgen"
        }
    };
}

function createOptionsCompanies(dataSource) {
    const numberFormatter = new Intl.NumberFormat(window.getLanguage());
    const headers = ["Unternehmen", "Land", "Jahr", "CO₂ (Mio. t)"];
    const data = dataSource.map(row => [
        row.parent_entity,
        row.Country,
        row.year,
        numberFormatter.format(row.total_emissions_MtCO2e)
    ]);

    return {
        data: {
            headings: headers,
            data: data
        },
        perPage: 10,
        perPageSelect: [10, 25, 50],
        searchable: true,
        sortable: true,
        labels: {
            placeholder: "Suchen...",
            perPage: "Einträge pro Seite",
            noRows: "Keine Daten verfügbar.",
            info: "Zeige {start} bis {end} von {rows} Einträgen"
        }
    };
}