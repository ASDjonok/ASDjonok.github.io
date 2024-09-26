import {Container} from "../../libs/dev/pixi.mjs";
import SpinButton from "./SpinButton.js";
import {CONFIG} from "../config.js";

export default class Footer extends Container {
    constructor() {
        super();

        console.log('Footer created');

        this.initChildren();
    }

    initChildren() {
        this.spinButton = this.addChild(new SpinButton());
        this.spinButton.y = CONFIG.footerHeight / 2 - CONFIG.spinButton.height / 2;
    }

}
