class RollsContainer extends PIXI.Container {
    constructor() {
        super();

        console.log('RollsContainer created');

        this.initChildren();
    }

    initChildren() {
        this.initMargin();
        this.initBorder();
        this.initRolls();
    }

    initMargin() {
        this.addChild(new PIXI.Graphics()
                .rect(0, 0,
                    this.borderRectangleWidth() + CONFIG.rollsContainerBorderMargin * 2,
                    this.borderRectangleHeight() + CONFIG.rollsContainerBorderMargin * 2)
                .fill({color: 0x000000, alpha: 0})
            // .stroke({ width: 2, color: "grey" })
        );
    }

    initBorder() {
        this.addChild(new PIXI.Graphics()
                .rect(CONFIG.rollsContainerBorderMargin, CONFIG.rollsContainerBorderMargin, this.borderRectangleWidth(),
                    this.borderRectangleHeight())
                .fill({color: 0x000000, alpha: 0})
            // .stroke({ width: 2, color: CONFIG.rollsContainerBorderColor })
        );
    }

    initRolls() {
        this.rolls = [];
        for (let i = 0; i < CONFIG.rollsQuantity; i++) {
            const roll = new Roll(i);
            roll.x = i * CONFIG.rollWidth + (i + 1) * CONFIG.rollHorizontalMargin + CONFIG.rollsContainerBorderMargin;
            roll.y = CONFIG.rollsContainerBorderMargin;

            this.rolls.push(roll);
            this.addChild(roll);
        }
    }

    heightByConfig() {
        return Roll.heightByConfig() + CONFIG.rollsContainerBorderMargin * 2;
    }

    widthByConfig() {
        return CONFIG.rollsQuantity * CONFIG.rollWidth + (CONFIG.rollsQuantity + 1) * CONFIG.rollHorizontalMargin +
            CONFIG.rollsContainerBorderMargin * 2;
    }

    borderRectangleHeight() {
        return Roll.heightByConfig();
    }

    borderRectangleWidth() {
        return CONFIG.rollsQuantity * CONFIG.rollWidth + (CONFIG.rollsQuantity + 1) * CONFIG.rollHorizontalMargin +
            CONFIG.rollsContainerBorderMargin * 2;
    }

    updateRolls() {
        this.rolls.forEach(roll => {
            roll.updateSymbols();
        });
    }
}
