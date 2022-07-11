/*jshint esversion: 6 */

/**
* Render help page.
*/

function HelpPage() {
    if (!mainController.isHelp()) {
        return "";
    }
    return `
        <h2>CertInChains help</h2>

        <div id="help"></div>
        
        <button onclick=mainController.closeHelp()>Close</button>
    `;
} 
