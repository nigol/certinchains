/*jshint esversion: 6 */

import {inject} from "../instances.js";

export class MainController {
    constructor() {
        this.message = "Starting application.";
        this.url = "";
        this.chain = "";
        this.help = false;
    }

    postConstruct() {
    	this.certDao = inject("certDao");
        this.helpDao = inject("helpDao");
    }
    
    showCerts() {
        const success = (chain) => {
            this.message = `Chain for ${this.url} retrieved.`;
            update("#message");
            this.chain = chain;
            this.refreshDisplay();
        };
        const error = (error) => {
            this.message = `Error retrieving chain for ${this.url}.`;
            update("#message");
            this.refreshDisplay();
        };
        this.certDao.getCertData(success, error, this.url);
    }
    
    onUrlChanged() {
        const event = window.event;
        this.url = event.target.value;
        console.log(this.url);
    }

    refreshDisplay() {
        console.log(this.chain);
    }

    isHelp() {
        return this.help;
    }

    closeHelp() {
        this.help = false;
        update("#helpPage");
    }

    showHelp() {
        const success = (mdText) => {
            document.getElementById("help").innerHTML = marked.parse(mdText);
        };
        const error = (errMessage) => {
            this.message = errMessage;
            this.help = false;
            update("#message");
        };
        this.help = true;
        update("#helpPage");
        this.helpDao.getHelpData(success, error);
    }
}
