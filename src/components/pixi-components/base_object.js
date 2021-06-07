import * as PIXI from "pixi.js";
import {Transformer} from './transformer/Transformer';
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
        this.zIndex = 0
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
    onDragStart = (event) => {
        // if(callback() === 'select'){ 
            // console.log("Starting drag")
          this.mouse_start_x = this.mouse.x
          this.mouse_start_y = this.mouse.y
          this.displayObject.alpha = 0.5;
          this.dragging = true;
          // Check for double click
          if(this._clicked){
            alert('double click in 150ms detected, you can emit or call method related!');
            this.dragging = false;
          }
          this._clicked = false;
          clearTimeout(this.__double);
        // }
      }

    onDragEnd = (event) => {
        if(this.displayObject)
        {
            this.dragging = false;
            this.displayObject.alpha = 1;
            this.mouse_start_x = 0
            this.mouse_start_y = 0
            // Check for double click
            this._clicked = true;
            // _selected = true;
            this.__double = setTimeout(() => { this._clicked = false; }, 150); // time for double click detection
        }
    }
    
    onDragMove = (event) => {
        if(this.dragging && this.displayObject){
          let start_x = this.displayObject.position.x
          let start_y = this.displayObject.position.y
          let delX = this.mouse.x - this.mouse_start_x
          let delY = this.mouse.y - this.mouse_start_y
          this.displayObject.position.set(start_x + delX, start_y + delY);
          this.mouse_start_x = this.mouse.x
          this.mouse_start_y = this.mouse.y
        }
      }

    stopDrag = () => {
        this.dragging = false;
    }

    onClick = (event) => {
        if(!this.isSelected){
            this.drawTransformer();
            Transformer(this.displayObject, this.mouse, this.stopDrag);
            this.isSelected = true;
        }
    }
    setInteractions = () => {
        if(this.displayObject)
        {
            // console.log("Setting Interactions", this.displayObject)
            this.displayObject.on('mousedown', this.onDragStart);
            this.displayObject.on('touchstart', this.onDragStart);
            this.displayObject.on('pointerdown', this.onDragStart);
            this.displayObject.on('mouseup', this.onDragEnd);
            this.displayObject.on('mouseupoutside', this.onDragEnd);
            this.displayObject.on('touchend', this.onDragEnd);
            this.displayObject.on('touchendoutside', this.onDragEnd);
            this.displayObject.on('pointerup', this.onDragEnd);
            this.displayObject.on('pointerupoutside', this.onDragEnd);
            this.displayObject.on('mousemove', this.onDragMove);
            this.displayObject.on('touchmove', this.onDragMove);
            this.displayObject.on('pointermove', this.onDragMove);
            this.displayObject.on('click', this.onClick);
        }
    }
}
class Image extends BaseObject{
    constructor(app, source, img_data)
    {
        super(app)
        this.source = source
        this.mask = undefined
        this.img_data = img_data
        this.drawImage()
        this.setInteractions()
    }
    drawImage()
    {
        var temp_image = PIXI.Sprite.from(this.source);
        // center the sprite anchor point
        temp_image.anchor.x = 0;
        temp_image.anchor.y = 0;
        // move the sprite to the center of the canvas
        temp_image.position.x = this.img_data.x;
        temp_image.position.y = this.img_data.y;
        temp_image.interactive = true;
        this.displayObject = temp_image
        this.app.stage.addChild(temp_image); 
        // const graphics = new PIXI.Graphics();
        // setTimeout(() => {this.drawTransformer()}, 1000)
    }
}
class Shape extends BaseObject
{
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
    // let shape = undefined
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
    this.displayObject = graphics
    this.app.stage.addChild(graphics);
    // setTimeout(() => {this.drawTransformer()}, 1000)
   }
}
export {
    BaseObject,
    Image,
    Shape
}