import {Container, Graphics, Text} from "../../libs/dev/pixi.mjs";
import {CONFIG, YELLOW_COLOR} from "../config.js";
import {Tween} from "../../libs/dev/tween-25.0.0.esm.js";
import RollsContainer from "./RollsContainer.js";
import Footer from "./Footer.js";
import Header from "./Header.js";
import Utilities from "../utilities/Utilities.js";

export default class Field extends Container {
    constructor() {
        super();

        this.initChildren();
        this.initListeners();
    }

    initListeners() {
        this.footer.spinButton.on('spin', () => {
            this.rollsContainer.updateRolls();
        });

        this.rollsContainer.rolls[this.rollsContainer.rolls.length - 1].on('roll-end', () => {
            this.footer.spinButton.blocked = false;
            this.header.balance.text = 'BALANCE: ' + CONFIG.apiResponse.balance;
            this.checkWin();
            this.checkGameOver();
        });
    }

    checkWin() {
        if (CONFIG.apiResponse.win) {
            Utilities.showAnimatedText('Win: ' + CONFIG.apiResponse.win, true);
        }
    }

    checkGameOver() {
        if (CONFIG.apiResponse.balance < CONFIG.apiResponse.bets[0]) {
            this.gameOverText = this.addChild(new Text({
                text: 'Game over',
                style: {
                    fontFamily: 'Arial',
                    fontSize: 50,
                    fill: 0xFF0000,
                    align: 'center'
                }
            }));
            this.gameOverText.anchor.set(0.5);
            this.gameOverText.x = this.widthByConfig() / 2;
            this.gameOverText.y = this.heightByConfig() / 2;

            this.footer.spinButton.blocked = true;
        }
    }

    initChildren() {
        this.rollsContainer = new RollsContainer();
        this.rollsContainer.y = CONFIG.headerHeight;
        this.addChild(this.rollsContainer);

        this.initBlindZones();

        this.header = this.addChild(new Header());
        this.header.x = this.rollsContainer.widthByConfig() / 2;

        this.footer = this.addChild(new Footer());
        this.footer.y = CONFIG.headerHeight + this.rollsContainer.heightByConfig();
        this.footer.x = this.rollsContainer.widthByConfig() / 2;
    }

    initBlindZones() {
        this.initBlindZoneAboveRolls();
        this.initBlindZoneUnderRolls();
    }

    initBlindZoneUnderRolls() {
        this.blindZoneUnderRolls = this.addChild(new Graphics()
            .rect(0, 0, CONFIG.blindZoneUnderRolls.width, CONFIG.blindZoneUnderRolls.height)
            .fill(CONFIG.backgroundColor)
        );
        this.blindZoneUnderRolls.y = CONFIG.blindZoneUnderRolls.y;
    }

    initBlindZoneAboveRolls() {
        this.blindZoneAboveRolls = this.addChild(new Graphics()
            .rect(0, 0, CONFIG.blindZoneAboveRolls.width, CONFIG.blindZoneAboveRolls.height)
            .fill(CONFIG.backgroundColor)
        );
        this.blindZoneAboveRolls.y = CONFIG.blindZoneAboveRolls.y;
    }

    heightByConfig() {
        return this.rollsContainer.heightByConfig() + CONFIG.footerHeight + CONFIG.headerHeight;
    }

    widthByConfig() {
        return this.rollsContainer.widthByConfig();
    }
}
