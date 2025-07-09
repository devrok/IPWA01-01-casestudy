/*
 * Helper functions for the application
 */

/** tries to get an element by its ID and throws an error if not found
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
 * Retrieves the display language of the current site.
 * If no language is set, it defaults to "de-DE".
 * @returns {string} - The preferred language code.
 */
function getLanguage() {
    // Ermittle die Sprache, in welcher die Seite angezeigt wird
    const language = document.documentElement.lang|| "de-DE";
    return language;
}
window.getLanguage = getLanguage;

/*
 * Escape funciton to protect against XSS attacks
 * @param {string} unsafeText - The text to be escaped
 * @returns {string} - The escaped text
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
 * Validation of an email address
 * @param {string} email - The email address to validate
 * @returns {boolean} - Returns true if the email is valid, false otherwise
 */
function validateEmail(email) {
    const regEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regEx.test(String(email).toLowerCase());
}
window.validateEmail = validateEmail;


/* 
 * 
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