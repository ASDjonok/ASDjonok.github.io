import {Container, Graphics, Text} from "../libs/pixi.min.mjs";
import {CONFIG} from "../config.js";

export default class BetController extends Container {
    constructor() {
        super();

        this.initChildren();
    }

    initChildren() {
        this.initText();
        this.initButtons();
    }

    initText() {
        this.text = new Text({
            text: 'BET:',
            style: {
                fontFamily: 'Arial',
                fontSize: CONFIG.betController.fontSize,
                fill: CONFIG.betController.textColor,
                align: 'center'
            }
        });
        this.text.x = 15;
        this.text.anchor.set(0.5);

        this.addChild(this.text);
    }

    initButtons() {
        this.buttons = [];
        for (let i = 0; i < CONFIG.apiResponse.bets.length; i++) {
            const buttonContainer = new Container();
            const button = new Graphics();
            button.roundRect(0, 0, CONFIG.betButton.width, CONFIG.betButton.height, CONFIG.betButton.radius);
            button.fill(CONFIG.betButton.color);

            const text = new Text({
                text: CONFIG.apiResponse.bets[i],
                style: {
                    fontFamily: 'Arial',
                    fontSize: CONFIG.betButton.fontSize,
                    fill: CONFIG.betButton.textColor,
                    align: 'center'
                }
            });
            text.x = CONFIG.betButton.width / 2;
            text.y = CONFIG.betButton.height / 2;
            text.anchor.set(0.5);
            buttonContainer.addChild(button);
            buttonContainer.addChild(text);

            if (CONFIG.apiResponse.bets[i] === CONFIG.apiResponse.last_bet
                || (CONFIG.apiResponse.last_bet === 0 && i === 0)) {
                buttonContainer.alpha = 1;
                CONFIG.apiResponse.last_bet = CONFIG.apiResponse.bets[i];
            } else {
                buttonContainer.alpha = 0.5;
            }

            buttonContainer.eventMode = 'static';
            buttonContainer.cursor = 'pointer';
            buttonContainer.on('pointerdown', () => {
                this.buttons.forEach((button) => {
                    button.alpha = 0.5;
                });
                buttonContainer.alpha = 1;
                CONFIG.apiResponse.last_bet = CONFIG.apiResponse.bets[i];
            });
            buttonContainer.x = this.text.width + i * CONFIG.betButton.deltaX;
            buttonContainer.y = -buttonContainer.height / 2;

            this.addChild(buttonContainer);
            this.buttons.push(buttonContainer);
        }
    }

}
