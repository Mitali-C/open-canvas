import * as PIXI from "pixi.js";
import BaseObject from './base_object';

class Markup extends BaseObject{
  constructor(app, markup_data){
    super(app);
    this.markup_data = markup_data;
    this.path = [];
    this.mouse = [0,0]
    this.addMarkup();
  }

  addMarkup(){
    var ppts = [];
    var mouse = [0,0];

    var g = new PIXI.Graphics();
    let moving = false;

    const mouseMoveFun = (e) => {
      moving = true;
        
      mouse[0] = typeof e.offsetX !== 'undefined' ? e.offsetX : e.layerX;
      mouse[1] = typeof e.offsetY !== 'undefined' ? e.offsetY : e.layerY;
        
      ppts.push([mouse[0],mouse[1]]);
      onPaint();
    }

    window.addEventListener('mousemove', mouseMoveFun, true);

    window.addEventListener('mousedown', function(e) {
        
      mouse[0] = typeof e.offsetX !== 'undefined' ? e.offsetX : e.layerX;
      mouse[1] = typeof e.offsetY !== 'undefined' ? e.offsetY : e.layerY;
        
      ppts.push([mouse[0],mouse[1]]);
    }, false);

    const onMouseUp = () => {
      window.removeEventListener('mousemove', mouseMoveFun, true );
      if(moving){
        g.boundsPadding = 0;
        var texture = this.app.renderer.generateTexture(g);;
        var sprite = new PIXI.Sprite(texture);

        // center the sprite anchor point
        sprite.anchor.x = 0;
        sprite.anchor.y = 0;
    
        // move the sprite to the center of the canvas
        sprite.position.x = g.getLocalBounds().x;
        sprite.position.y = g.getLocalBounds().y;
        sprite.interactive = true;
        sprite.tint = 0xFF0000;
        sprite.on('click', this.onClick)
        this.displayObject = sprite;
        this.app.stage.children.pop();
        this.app.stage.addChild(sprite);
      }
      moving = false;
    }

    window.addEventListener('mouseup', onMouseUp, true);

    const onPaint = () => {
      g.moveTo(ppts[0][0], ppts[0][1])
      let current = [ppts[0][0], ppts[0][1]]
      g.lineStyle(4, 0x000000, 1);
      for(let i = 1; i<ppts.length-2 ; i++){
        g.quadraticCurveTo(current[0], current[1], ppts[i][0], ppts[i][1])
        current = [ppts[i][0], ppts[i][1]];
        g.moveTo(ppts[i][0], ppts[i][1]);

      }
      this.app.stage.addChild(g);
    }
  }
}

export default Markup;