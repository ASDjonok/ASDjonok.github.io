class Roll extends PIXI.Container {
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
            PIXI.Texture.from('assets/light_rotate_1.png'),
            PIXI.Texture.from('assets/light_rotate_2.png'),
            PIXI.Texture.from('assets/rt_object_01.png'),
            PIXI.Texture.from('assets/rt_object_02.png'),
            PIXI.Texture.from('assets/rt_object_03.png'),
            PIXI.Texture.from('assets/rt_object_04.png'),
            PIXI.Texture.from('assets/rt_object_05.png'),
            PIXI.Texture.from('assets/rt_object_06.png'),
            PIXI.Texture.from('assets/rt_object_07.png'),
            PIXI.Texture.from('assets/rt_object_08.png'),
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
            new TWEEN.Tween(symbol)
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
