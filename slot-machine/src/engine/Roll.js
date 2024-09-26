import {Tween} from "../../libs/dev/tween-25.0.0.esm.js";
import {Container, Texture} from "../../libs/dev/pixi.mjs";
import {CONFIG} from "../config.js";
import Symbol from "./Symbol.js";
import Utilities from "../utilities/Utilities.js";

export default class Roll extends Container {
    constructor(rollNumber) {
        super();

        this.rollNumber = rollNumber;

        this.initChildren();
    }

    initChildren() {
        this.initSymbols();
    }

    initSymbols() {
        if (!Symbol.symbolsTextures) {
            this.initSymbolsTextures();
        }

        this.symbols = [];
        this.symbolsDeltaY = CONFIG.symbolSize + CONFIG.symbolVerticalMargin;
        for (let i = 0; i < CONFIG.rowsQuantity; i++) {
            const symbol = new Symbol(CONFIG.apiResponse.rolls[this.rollNumber][i]);
            symbol.y = i * this.symbolsDeltaY;

            symbol.scale.x = symbol.scale.y = Math.min(CONFIG.symbolSize / symbol.width,
                CONFIG.symbolSize / symbol.height);

            this.symbols.push(symbol);
            this.addChild(symbol);
        }
    }

    static heightByConfig() {
        return CONFIG.rowsQuantity * CONFIG.symbolSize + (CONFIG.rowsQuantity + 1) * CONFIG.symbolVerticalMargin;
    }

    initSymbolsTextures() {
        Symbol.symbolsTextures = [
            Texture.from('assets/light_rotate_1.png'),
            Texture.from('assets/light_rotate_2.png'),
            Texture.from('assets/rt_object_01.png'),
            Texture.from('assets/rt_object_02.png'),
            Texture.from('assets/rt_object_03.png'),
            Texture.from('assets/rt_object_04.png'),
            Texture.from('assets/rt_object_05.png'),
            Texture.from('assets/rt_object_06.png'),
            Texture.from('assets/rt_object_07.png'),
            Texture.from('assets/rt_object_08.png'),
        ];
    }

    updateSymbols() {
        this.intermediateSymbolsForSpinCounter = CONFIG.intermediateSymbolsQuantityForSpinByRoll[this.rollNumber];
        this.apiResponseSymbolsCounter = CONFIG.rowsQuantity;
        this.scrollToNextSymbol();
    }

    scrollToNextSymbol() {
        this.addNewSymbol();

        this.symbols.forEach((symbol, i) => {
            const symbolPositionDownTween = new Tween(symbol)
                .to({y: symbol.y + this.symbolsDeltaY}, CONFIG.timeMovingSymbolToNextPosition)
                .onComplete(() => {
                    if (i === CONFIG.rowsQuantity - 1) {
                        this.removeChild(this.symbols.pop());
                        if (this.apiResponseSymbolsCounter) {
                            this.scrollToNextSymbol();
                        } else {
                            if (this.rollNumber === CONFIG.rollsQuantity - 1) {
                                this.emit('roll-end');
                            }
                        }
                    }
                })
                .start();
            Game.tweenGroup.add(symbolPositionDownTween);
        });
    }

    addNewSymbol() {
        let symbol;
        if (this.intermediateSymbolsForSpinCounter) {
            this.intermediateSymbolsForSpinCounter--;
            symbol = new Symbol(Utilities.getRandomSymbolNumber());
        } else if (this.apiResponseSymbolsCounter) {
            this.apiResponseSymbolsCounter--;
            symbol = new Symbol(CONFIG.apiResponse.rolls[this.rollNumber][this.apiResponseSymbolsCounter]);
        } else {
            symbol = new Symbol(Utilities.getRandomSymbolNumber());
        }

        symbol.y = - this.symbolsDeltaY;
        symbol.scale.x = symbol.scale.y = Math.min(CONFIG.symbolSize / symbol.width,
            CONFIG.symbolSize / symbol.height);
        this.symbols.unshift(symbol);
        this.addChild(symbol);
    }

}
