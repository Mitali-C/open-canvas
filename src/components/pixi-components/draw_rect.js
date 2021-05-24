import * as PIXI from "pixi.js";

const drawRect = (rect_data, app, callback) => {
  var mouse = app.renderer.plugins.interaction.mouse.global;

  const graphics = new PIXI.Graphics();
  var dragging = false;

  // Rectangle
  graphics.lineStyle(2, 0x000000, 1);
  graphics.beginFill(0xFFFFFF);
  graphics.drawRect(rect_data.x, rect_data.y, rect_data.width, rect_data.height);
  graphics.interactive = true;

  graphics.click = (e) => {
    callback('rectangle', rect_data)
  }
  graphics.endFill();

  app.stage.addChild(graphics);

  const onDragStart = (event) => {
    graphics.alpha = 0.5;
    dragging = true;
  }

  const onDragEnd = (event) => {
    dragging = false;
    graphics.alpha = 1;
  }

  const onDragMove = (event) => {
    if(dragging){
      graphics.position.set(mouse.x, mouse.y)
    }
  }

  graphics.pointerdown=onDragStart;
  graphics.pointerup = onDragEnd;
  graphics.pointerupoutside = onDragEnd;
  graphics.pointermove = onDragMove;

  graphics.mousedown=onDragStart;
  graphics.touchstart = onDragStart;
  graphics.mouseup = onDragEnd;
  graphics.mouseupoutside = onDragEnd;
  graphics.touchend = onDragEnd;
  graphics.touchendoutside = onDragEnd;
  graphics.mousemove = onDragMove;
  graphics.touchmove = onDragMove;
}

export {drawRect};