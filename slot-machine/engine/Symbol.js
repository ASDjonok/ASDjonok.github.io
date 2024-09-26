import {Sprite} from "../libs/pixi.min.mjs";

export default class Symbol extends Sprite {
    constructor(symbolNumber) {
        super(Symbol.symbolsTextures[symbolNumber]);
    }

}
