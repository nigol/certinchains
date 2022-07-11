/*jshint esversion: 6 */

import {MainController} from "./controllers/MainController.js";
import {CertDao} from "./daos/CertDao.js";
import {HelpDao} from "./daos/HelpDao.js";

export const sessionScope = {
    "mainController": new MainController(),
    "certDao": new CertDao(),
    "helpDao": new HelpDao()
};

export function inject(key) {
    return sessionScope[key];
}

sessionScope.mainController.postConstruct();