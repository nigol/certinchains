/*jshint esversion: 6 */

export class CertDao {
    constructor() {
        this.baseUrl = window.location.href;
    }

    getCertData(onSuccess, onError, url) {
        fetch(this.baseUrl + `/api/url?url=${url}`, {
            method: "GET",
            headers: {
                "Content-type": "text/plain",
            },
        })
        .then((response) => response.text())
        .then(text => onSuccess(text))
        .catch((error) => onError("Error reading cert data."));
    }
}
