/*
 * Funktion um JSON-Daten asynchron zu laden
 * @param {string} jsonFile - Der Pfad zur JSON-Datei
 */
 async function loadData(jsonFile) {
    try {
        const response = await fetch(jsonFile);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error loading JSON data: ', error);
        return null;
    }
}
window.loadData = loadData;

