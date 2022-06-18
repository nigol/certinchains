/*jshint esversion: 6 */

import {inject} from "./instances.js";

export const mainController = inject("mainController");

export function updateComponent(selector) {
    const component = document.querySelector(selector);
    if (component !== null) {
    	const script = component.querySelector("script");
    	const newScript = document.createElement("script");
    	newScript.innerHTML = script.innerHTML;
    	component.innerHTML = "";
    	component.appendChild(newScript);
    }
}
