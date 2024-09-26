import {CONFIG, YELLOW_COLOR} from '../config.js';
import {Text} from "../libs/pixi.min.mjs";
import {Tween} from "../libs/tween-25.0.0.esm.min.js";

export default class Utilities {
    static getRandomSymbolNumber() {
        return Math.floor(Math.random() * CONFIG.symbolsQuantity);
    }

    static showAnimatedText(text, shouldBeHidden = false) {
        const textObject = Game.app.stage.addChild(new Text({
            text: text,
            style: {
                fontFamily: 'Arial',
                fontSize: 74,
                fill: YELLOW_COLOR,
                align: 'center'
            }
        }));
        textObject.anchor.set(0.5);
        textObject.x = Game.app.screen.width / 2;
        textObject.y = Game.app.screen.height / 2;

        Utilities.animateWinText(textObject, shouldBeHidden);
        return textObject;
    }

    static animateWinText(textObject, shouldBeHidden) {
        textObject.scale = 0;
        const textScaleUpTween = new Tween(textObject.scale, false)
            .to({x: 1.3, y: 1.3}, 260)
            .onComplete(() => {
                const textScaleDownTween = new Tween(textObject.scale)
                    .to({x: 1, y: 1}, 60)
                    .onComplete(() => {
                        if (shouldBeHidden) {
                            setTimeout(() => {
                                const textAlphaDecreaseTween = new Tween(textObject)
                                    .to({alpha: 0}, 250)
                                    .onComplete(() => {
                                        textObject.parent.removeChild(textObject);
                                    })
                                    .start();
                                Game.tweenGroup.add(textAlphaDecreaseTween);
                            }, 500);
                        }
                    })
                    .start();
                Game.tweenGroup.add(textScaleDownTween);
            })
            .start();
        Game.tweenGroup.add(textScaleUpTween);
    }

}
