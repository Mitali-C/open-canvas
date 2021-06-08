import * as PIXI from "pixi.js";
import BaseObject from './base_object';

class Image extends BaseObject{
  constructor(app, source, img_data)
  {
      super(app);
      this.source = source
      this.mask = undefined
      this.img_data = img_data;
      this.drawImage();
      this.setInteractions();
  }
  
  drawImage(){
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

export default Image;