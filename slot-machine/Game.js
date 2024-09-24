/**
 * inspired by https://pixijs.com/8.x/examples/advanced/slots
 */
class Game {
    static {
        this.init().then(() => console.log('Game initialized', this.app.stage.children));
    }

    static async init() {
        this.app = new PIXI.Application();
        await this.app.init({ background: CONFIG.backgroundColor, resizeTo: window });
        document.body.appendChild(this.app.canvas);

        this.app.ticker.add(this.tick, this);

        this.api = CONFIG.env === 'dev' ? new MockAPI() : new API();

        CONFIG.apiResponse = (await Promise.all([this.loadAssets(), this.api.init(CONFIG.userId)]))[1];

        this.initChildren();
        this.initListeners();
    }

    static tick() {
        TWEEN.update();
    }

    static initListeners() {
        window.addEventListener('resize', () => {
            this.onResize();
        });
        screen.orientation.addEventListener("change", (event) => {
            this.onResize();
        });
    }

    static onResize() {
        this.app.renderer.resize(window.innerWidth, window.innerHeight);
        this.initFieldScale();
        this.initFieldPosition();
    }

    static initChildren() {
        this.initField();
    }

    static initField() {
        this.field = new Field();
        this.initFieldScale();
        this.initFieldPosition();
        this.app.stage.addChild(this.field);
    }

    static initFieldScale() {
        const scale = Math.min(this.app.screen.width / this.field.widthByConfig(),
            this.app.screen.height / this.field.heightByConfig());
        this.field.scale.set(scale);
    }

    static initFieldPosition() {
        // todo verticalMargin needed?
        // const verticalMargin = (this.app.screen.height - CONFIG.SYMBOL_SIZE * CONFIG.ROWS_QUANTITY) / 2;
        const verticalMargin = (this.app.screen.height - this.field.height) / 2;
        this.field.y = verticalMargin;
        // this.field.x = Math.round((this.app.screen.width - CONFIG.ROLL_WIDTH * CONFIG.ROLLS_QUANTITY) / 2);
        this.field.x = Math.round((this.app.screen.width - this.field.width) / 2);
    }

    /**
     * assets downloaded from https://pixijs.com/assets/
     */
    static async loadAssets() {
        await PIXI.Assets.load([
            'assets/light_rotate_1.png',
            'assets/light_rotate_2.png',
            'assets/rt_object_01.png',
            'assets/rt_object_02.png',
            'assets/rt_object_03.png',
            'assets/rt_object_04.png',
            'assets/rt_object_05.png',
            'assets/rt_object_06.png',
            'assets/rt_object_07.png',
            'assets/rt_object_08.png',
        ]);
    }

}

window.Game = Game;
