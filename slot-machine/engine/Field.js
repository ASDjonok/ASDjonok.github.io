class Field extends PIXI.Container {
    constructor() {
        super();

        console.log('Field created');

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
            this.winText = this.addChild(new PIXI.Text({
                text: 'Win: ' + CONFIG.apiResponse.win,
                style: {
                    fontFamily: 'Arial',
                    fontSize: 50,
                    fill: YELLOW_COLOR,
                    align: 'center'
                }
            }));
            this.winText.anchor.set(0.5);
            this.winText.x = this.widthByConfig() / 2;
            this.winText.y = this.heightByConfig() / 2;

            this.animateWinText();
        }
    }

    animateWinText() {
        this.winText.scale = 0;
        new TWEEN.Tween(this.winText.scale)
            .to({x: 2, y: 2}, 250)
            .onComplete(() => {
                new TWEEN.Tween(this.winText.scale)
                    .to({x: 1.5, y: 1.5}, 125)
                    .onComplete(() => {
                        setTimeout(() => {
                            new TWEEN.Tween(this.winText)
                                .to({alpha: 0}, 250)
                                .onComplete(() => {
                                    this.removeChild(this.winText);
                                })
                                .start();
                        }, 500);
                    })
                    .start();
            })
            .start();
    }

    checkGameOver() {
        if (CONFIG.apiResponse.balance < CONFIG.apiResponse.bets[0]) {
            this.gameOverText = this.addChild(new PIXI.Text({
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
        this.blindZoneUnderRolls = this.addChild(new PIXI.Graphics()
            .rect(0, 0, CONFIG.blindZoneUnderRolls.width, CONFIG.blindZoneUnderRolls.height)
            .fill(CONFIG.backgroundColor)
        );
        this.blindZoneUnderRolls.y = CONFIG.blindZoneUnderRolls.y;
    }

    initBlindZoneAboveRolls() {
        this.blindZoneAboveRolls = this.addChild(new PIXI.Graphics()
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
