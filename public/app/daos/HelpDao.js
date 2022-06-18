/*jshint esversion: 6 */

export class HelpDao {
    constructor() {
        this.baseUrl = window.location.href;
    }

    getHelpData(onSuccess, onError) {
        fetch(this.baseUrl + `help/help.md`, {
            method: "GET",
            headers: {
                "Content-type": "text/plain",
            },
        })
        .then((response) => response.text())
        .then(text => onSuccess(text))
        .catch((error) => onError("Error reading help file."));
    }
}
