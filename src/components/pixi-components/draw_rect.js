import * as PIXI from "pixi.js";

const drawRect = (x, y, app) => {
  console.log("creating rectangle:", x, y);
    const graphics = new PIXI.Graphics();
    let clicked = false;

    // Rectangle
    graphics.lineStyle(2, 0x000000, 1);
    graphics.beginFill(0xFFFFFF);
    graphics.drawRect(x, y, 100, 100);
    graphics.interactive = true;
    graphics.buttonMode = true;
    
    graphics.pointertap=()=>{
      console.log('clicked:',)
      clicked = true;
    }
    graphics.pointerout = (e)=>{
      const coords = e.data.global;
      console.log('mouse move:', x - coords.x);
      if(clicked){
        console.log('here');
        // graphics.drawRect(coords.x, coords.y, 100, 100);
      }
    }
    graphics.endFill();

    app.stage.addChild(graphics);
}

export {drawRect};