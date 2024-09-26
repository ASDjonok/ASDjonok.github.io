import Field from "./engine/Field.js";
import {Application, Assets} from "./libs/pixi.min.mjs";
import {CONFIG} from "./config.js";
import {Group} from "./libs/tween-25.0.0.esm.min.js";
import MockAPI from "./services/MockAPI.js";
import RealAPI from "./services/RealAPI.js";
import Utilities from "./utilities/Utilities.js";

/**
 * inspired by https://pixijs.com/8.x/examples/advanced/slots
 */
class Game {
    static {
        Game.init().then(() => console.log('Game initialized', Game.app.stage.children));
    }

    static async init() {
        Game.app = new Application();
        await Game.app.init({ background: CONFIG.backgroundColor, resizeTo: window, antialias: true });
        document.body.appendChild(Game.app.canvas);

        Game.app.ticker.add(Game.tick, this);

        Game.api = CONFIG.env === 'dev' ? new MockAPI() : new RealAPI(CONFIG.apiUrl);

        Game.tweenGroup = new Group();

        Game.initWindowAndScreenListeners()

        try {
            CONFIG.apiResponse = (await Promise.all([Game.loadAssets(), Game.api.init(CONFIG.userId)]))[1];

            Game.initChildren();
            Game.initFieldListeners();
        } catch (error) {
            console.error('An error occurred:', error);
            Game.errorTextObject = Utilities.showAnimatedText('Server error');
        }
    }

    static tick() {
        Game.tweenGroup.update();
    }

    static initWindowAndScreenListeners() {
        window.addEventListener('resize', () => {
            Game.onResize();
        });
        screen.orientation.addEventListener("change", () => {
            Game.onResize();
        });
    }

    static initFieldListeners() {
        Game.field.footer.spinButton.on('server-error', (errorTextObject) => {
            Game.errorTextObject = errorTextObject;
        });
    }

    static onResize() {
        Game.app.renderer.resize(window.innerWidth, window.innerHeight);

        if (Game.field) {
        Game.initFieldScale();
        Game.initFieldPosition();
        }

        if (Game.errorTextObject) {
            Game.initErrorTextObjectScale();
            Game.initErrorTextObjectPosition();
        }
    }

    static initErrorTextObjectScale() {
        if (Game.app.screen.width < Game.errorTextObject.width) {
            const scale = Game.app.screen.width / Game.errorTextObject.width;
            Game.errorTextObject.scale.set(scale);
        }
    }

    static initErrorTextObjectPosition() {
        Game.errorTextObject.x = Game.app.screen.width / 2;
        Game.errorTextObject.y = Game.app.screen.height / 2;
    }

    static initChildren() {
        Game.initField();
    }

    static initField() {
        Game.field = new Field();
        Game.initFieldScale();
        Game.initFieldPosition();
        Game.app.stage.addChild(Game.field);
    }

    static initFieldScale() {
        const scale = Math.min(Game.app.screen.width / Game.field.widthByConfig(),
            Game.app.screen.height / Game.field.heightByConfig());
        Game.field.scale.set(scale);
    }

    static initFieldPosition() {
        Game.field.y = (Game.app.screen.height - Game.field.height) / 2;
        Game.field.x = Math.round((Game.app.screen.width - Game.field.width) / 2);
    }

    /**
     * assets downloaded from https://pixijs.com/assets/
     */
    static async loadAssets() {
        await Assets.load([
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
