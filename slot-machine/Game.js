/**
 * inspired by https://pixijs.com/8.x/examples/advanced/slots
 */
class Game {
    static {
        Game.init();
    }

    static async init() {
        const app = new PIXI.Application();
        await app.init({ background: '#1099bb', resizeTo: window });
        document.body.appendChild(app.canvas);

        /**
         * assets downloaded from https://pixijs.com/assets/
         */
        await PIXI.Assets.load([
            'assets/rt_object_01.png',
            'assets/rt_object_02.png',
            'assets/rt_object_03.png',
            'assets/rt_object_04.png',
            'assets/rt_object_05.png',
            'assets/rt_object_06.png',
            'assets/rt_object_07.png',
            'assets/rt_object_08.png',
        ]);

        // todo think about resize
        const REEL_WIDTH = 160;
        const SYMBOL_SIZE = 150;

        const slotTextures = [
            PIXI.Texture.from('https://pixijs.com/assets/eggHead.png'),
            PIXI.Texture.from('https://pixijs.com/assets/flowerTop.png'),
            PIXI.Texture.from('https://pixijs.com/assets/helmlok.png'),
            PIXI.Texture.from('https://pixijs.com/assets/skully.png'),
        ];
    }
}
