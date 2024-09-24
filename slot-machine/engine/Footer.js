class Footer extends PIXI.Container {
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
