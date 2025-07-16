/*
 * Enthält Hilfsfunktionen für die Webseite
 */

/** Versucht, ein Element anhand seiner ID zu finden.
 * Wenn das Element nicht gefunden wird, wird eine Fehlermeldung in der Konsole ausgegeben
 * und eine Ausnahme ausgelöst.
 * @param {string} elementId - The ID of the element to retrieve
 * @returns {HTMLElement} - The HTML element with the specified ID
 * @throws {Error} - If the element with the specified ID is not found
 */
function getElementById(elementId) {
    const element = document.getElementById(elementId);
    if (!element) {
        const errorMessage = `Element with ID ${elementId} not found`;
        console.error(errorMessage);
        throw new Error(errorMessage);
    }
    return element;
}
window.getElementById = getElementById;

/*
 * Ermittelt die Sprache, in welcher die Seite angezeigt wird.
 * @returns {string} - Die Sprache der Seite, z.B. "de-DE" oder "en-US".
 */
function getLanguage() {
    // Ermittle die Sprache, in welcher die Seite angezeigt wird
    const language = document.documentElement.lang|| "de-DE";
    return language;
}
window.getLanguage = getLanguage;

/*
 * Escapted HTML-Sonderzeichen in einem Text
 * @param {string} unsafeText - Der zu escapende Text
 * @returns {string} - Der escpate Text
 */
function escapeHtml(unsafeText) {
    return unsafeText
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
window.escapeHtml = escapeHtml;

/*
 * Validiert eine E-Mail-Adresse anhand eines regulären Ausdrucks.
 * @param {string} email - Die zu validierende E-Mail-Adresse
 * @returns {boolean} - Liefert true, wenn die E-Mail-Adresse gültig ist
 */
function validateEmail(email) {
    const regEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regEx.test(String(email).toLowerCase());
}
window.validateEmail = validateEmail;


/* 
 * Abhängig von der ermittelten Sprache, wird durch setzen des "dir"-Attributs
 * die Schreibrichtung des Elements geändert.
 * @param {string} elementId - Die ID des Elements, dessen Schreibrichtung geändert werden soll
 * @returns {void}
 */
function changeDirectionOfElement(elementId) {
    const element = document.querySelector(elementId);
    const lang = getLanguage();

    if (
        lang.startsWith("ar") ||
        lang.startsWith("he") ||
        lang.startsWith("fa")
    ) {
        element.setAttribute("dir", "rtl");
    } else {
        element.setAttribute("dir", "ltr");
    }
}
window.changeDirectionOfElement = changeDirectionOfElement;