import {Sprite} from "../../libs/dev/pixi.mjs";

export default class Symbol extends Sprite {
    constructor(symbolNumber) {
        super(Symbol.symbolsTextures[symbolNumber]);
    }

}
