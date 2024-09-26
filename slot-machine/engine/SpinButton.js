import {Container, Graphics, Text} from "../libs/pixi.min.mjs";
import {CONFIG} from "../config.js";
import Utilities from "../utilities/Utilities.js";

export default class SpinButton extends Container {
    #blocked = false;

    constructor() {
        super();

        console.log('SpinButton created');

        this.initChildren();
    }

    initChildren() {
        this.initButton();
        this.initText();
    }

    initText() {
        this.text = new Text({
            text: 'SPIN',
            style: {
                fontFamily: 'Arial',
                fontSize: CONFIG.spinButton.fontSize,
                fill: CONFIG.spinButton.textColor,
                align: 'center'
            }
        });
        this.text.anchor.set(0.5);

        this.addChild(this.text);
    }

    initButton() {
        this.button = new Graphics();
        this.button.roundRect(-CONFIG.spinButton.width / 2, -CONFIG.spinButton.height / 2, CONFIG.spinButton.width,
            CONFIG.spinButton.height, CONFIG.spinButton.radius);
        this.button.fill(CONFIG.spinButton.color);

        this.eventMode = 'static';
        this.cursor = 'pointer';
        this.on('pointerdown', this.onButtonDown.bind(this));

        this.addChild(this.button);
    }

    async onButtonDown() {
        if (this.blocked) {
            return;
        }
        this.blocked = true;

        try {
            CONFIG.apiResponse = await Game.api.spin(CONFIG.userId, CONFIG.apiResponse.last_bet);
            this.emit('spin');
        } catch (error) {
            console.error('An error occurred:', error);
            this.emit('server-error', Utilities.showAnimatedText('Server error'));
        }
    }

    get blocked() {
        return this.#blocked;
    }

    set blocked(value) {
        this.#blocked = value;
        if (value) {
            this.button.alpha = 0.5;
        } else {
            this.button.alpha = 1;
        }
    }

}
