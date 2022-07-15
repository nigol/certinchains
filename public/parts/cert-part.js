/*jshint esversion: 6 */

/**
* Render input field with certificate info.
*/

function CertPart() {
    return `
        <div class="certPart">
            <div>
                <input type="text" id="url" 
                    placeholder="Type an URL." 
                    onkeyup=mainController.onUrlChanged()>
                </input>
            </div>

            <div>
                <button onclick=mainController.showCerts()>
                    Show
                </button>
            </div>

            <div>
                <button onclick=mainController.showHelp()>
                    ?
                </button>
            </div>
        </div>

        <div style="max-width: 100%; overflow: auto">
            <pre>
${mainController.getChain()}
            </pre>
        </div>

    `;
} 
