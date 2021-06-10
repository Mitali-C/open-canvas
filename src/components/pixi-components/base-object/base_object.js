import * as PIXI from "pixi.js";
import { TransformerPixi } from "../transformer/TransformerPixi";
class BaseObject
{
    constructor(app)
    {
        this.x = 0
        this.y = 0
        this.width = undefined
        this.height = undefined
        this.rotation = 0
        this.scale = {x: 1, y: 1}
        this.opacity = 1
        this.canScale = true
        this.canRotate = true
        this.canMove = true
        this.canChangeOpacity = true
        this.children = []
        this.displayObject = undefined
        this.isSelected = false
        this.app = app
        this.mouse = app.renderer.plugins.interaction.mouse.global;
        this.zIndex = 0;
    }

    drawTransformer()
    {
        if(this.displayObject)
        {
            const graphics = new PIXI.Graphics();
            graphics.lineStyle(2, 0x006EFF, 1);
            graphics.beginFill(0xFFFFFF, 0);
            let bounds = this.displayObject.getLocalBounds()
            graphics.drawRect(bounds.x, bounds.y, bounds.width, bounds.height);
            graphics.alpha = 1
            graphics.endFill();
            this.displayObject.addChild(graphics);
        }
    }

    onClick = (event) => {
        if(!this.isSelected){
            this.isSelected = true;
            new TransformerPixi(this.displayObject, this.app);
        }
    }
    setInteractions = () => {
        if(this.displayObject)
        {
            this.displayObject.on('click', this.onClick);
        }
    }
}
export default BaseObject;