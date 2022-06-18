/*jshint esversion: 6 */

import {inject} from "../instances.js";

export class MainController {
    constructor() {
        this.message = "Starting application.";
        this.url = "";
    }

    postConstruct() {
    	this.certService = inject("certService");
    }
    
    showCerts() {
        
    }
    
    onUrlChange() {
        const event = window.event;
        this.url = event.target.value;
    }
}
