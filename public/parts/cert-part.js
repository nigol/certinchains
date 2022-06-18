/*jshint esversion: 6 */

/**
* Render input field with certificate info.
*/

function CertPart() {
    return `
        <div class="certPart">
            <div>
                <input type="text" id="filter" placeholder="Type an URL.">
                </input>
                <button onclick=mainController.showCerts()>
                    Show
                </button>
                <button onclick=mainController.showHelp()>
                    ?
                </button>
            </div>
        </div>

    `;
} 
