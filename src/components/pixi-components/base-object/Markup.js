import * as PIXI from "pixi.js";
import BaseObject from './base_object';

class Markup extends BaseObject{
  constructor(app, markup_data){
    super(app);
    this.markup_data = markup_data;
    this.path = [];
    this.mouse = [0,0]
    // this.addMarkup();
  }

  addMarkup(){
    var ppts = [];
    var mouse = [0,0];

    var g = new PIXI.Graphics();
    var mask = new PIXI.Graphics();
    let  app = this.app;
    let moving = false;

    const mouseMoveFun = (e) => {
      // console.log('moving....')
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
        // console.log(app.stage.children)
        const bounds = g.getLocalBounds();
        mask.lineStyle(2, 0x006EFF, 1);
        mask.beginFill(0xFFFFFF, 0.9);
    
        mask.drawRect(bounds.x, bounds.y, bounds.width, bounds.height);
        mask.endFill();
        // mask.alpha = 0.1;
        mask.interactive = true;
        // g.addChild(mask)
        const graphicTexture = app.renderer.generateTexture(mask);
        const sprite = new PIXI.Sprite(graphicTexture);
    
        // center the sprite anchor point
        sprite.anchor.x = 0;
        sprite.anchor.y = 0;
    
        // move the sprite to the center of the canvas
        sprite.position.x = bounds.x;
        sprite.position.y = bounds.y;
        sprite.interactive = true;
        this.displayObject = sprite;
        // sprite.alpha = 0;
        g._mask = sprite;
        app.stage.addChild(sprite)
        this.displayObject = mask;
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