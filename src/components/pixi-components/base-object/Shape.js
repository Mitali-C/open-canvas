import * as PIXI from "pixi.js";
import BaseObject from './base_object';

class Shape extends BaseObject{
   constructor(app, type, shape_data)
   {
    super(app)
    this.type = type
    this.shape_data = shape_data
    this.drawShape()
    this.setInteractions()
   }
   drawShape()
   {
    const graphics = new PIXI.Graphics();
    graphics.lineStyle(2, 0x000000, 1);
    graphics.beginFill(0xFFFFFF);
    graphics.interactive = true;
    switch(this.type)
    {
        case 'RECTANGLE':
            graphics.drawRect(this.shape_data.x, this.shape_data.y, this.shape_data.width, this.shape_data.height);
            graphics.endFill();
            break
        case 'CIRCLE':
            graphics.drawEllipse(this.shape_data.x, this.shape_data.y, this.shape_data.width, this.shape_data.height);
            graphics.endFill();
            break
        default:
            break
    }
    const graphicTexture = this.app.renderer.generateTexture(graphics);
    const sprite = new PIXI.Sprite(graphicTexture);

    // center the sprite anchor point
    sprite.anchor.x = 0;
    sprite.anchor.y = 0;

    // move the sprite to the center of the canvas
    sprite.position.x = this.shape_data.x;
    sprite.position.y = this.shape_data.y;
    sprite.interactive = true;
    this.displayObject = sprite;

    // set color to the object
    // sprite.tint = 0x000000; // set color to the shape

    this.app.stage.addChild(sprite);
    // setTimeout(() => {this.drawTransformer()}, 1000)
   }
}

export default Shape;