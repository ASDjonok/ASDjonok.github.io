import {Container, Text} from "../../libs/dev/pixi.mjs";
import BetController from "./BetController.js";
import {CONFIG} from "../config.js";

export default class Header extends Container {
    constructor() {
        super();

        console.log('Header created');

        this.initChildren();
    }

    initChildren() {
        this.initBetController();
        this.initBalance();
    }

    initBetController() {
        this.betController = this.addChild(new BetController());
        this.betController.x = -this.betController.width;
        this.betController.y = CONFIG.headerContentTop;
    }

    initBalance() {
        this.balance = new Text({
            text: 'BALANCE: ' + CONFIG.apiResponse.balance,
            style: {
                fontFamily: 'Arial',
                fontSize: CONFIG.balance.fontSize,
                fill: CONFIG.balance.textColor,
                align: 'center'
            }
        });
        this.balance.anchor.set(0.5);
        this.balance.x = CONFIG.balance.x;
        this.balance.y = CONFIG.headerContentTop;

        this.addChild(this.balance);
    }
}
