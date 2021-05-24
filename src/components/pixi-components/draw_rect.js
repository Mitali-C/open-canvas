import * as PIXI from "pixi.js";

const drawRect = (x, y, app, callback) => {

  const graphics = new PIXI.Graphics();
  var data = null;
  var dragging = false;

  const onDragStart = (event) => {
    data = event.data;
    // console.log('start:', data, dragging);
    dragging = true;
  }

  const onDragEnd = (event) => {
    // console.log("end");
    dragging = false;
    // set the interaction data to null
    data = null;
  }

  const onDragMove = (event) => {
    if(dragging){
      const coords = data.getLocalPosition(app.stage)
      // console.log('moving...:',data.global.x ,coords.x);
      graphics.x = coords.x;
      graphics.y = coords.y;
      // graphics.position.set(coords.x, coords.y)
      // const newPosition = data.get
    }
  }

    // Rectangle
    graphics.lineStyle(2, 0x000000, 1);
    graphics.beginFill(0xFFFFFF);
    graphics.drawRect(x, y, 100, 100);
    graphics.interactive = true;
    graphics.buttonMode = true;

    graphics.click = (e) => {
      console.log('CLICKED:', graphics)
    }
    
    graphics.pointerdown=onDragStart;
    graphics.pointerup = onDragEnd;
    graphics.pointerupoutside = onDragEnd;
    graphics.pointermove = onDragMove;
    graphics.endFill();

    app.stage.addChild(graphics);
}

export {drawRect};