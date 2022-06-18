/*jshint esversion: 6 */

import {MainController} from "./controllers/MainController.js";
import {CertService} from "./services/CertService.js";

export const sessionScope = {
    "mainController": new MainController(),
    "certService": new CertService()
};

export function inject(key) {
    return sessionScope[key];
}

sessionScope.mainController.postConstruct();