import * as PIXI from "pixi.js";

const drawCircle = (circle_data, app, callback) => {
  var mouse = app.renderer.plugins.interaction.mouse.global;
  var dragging = false;
  const graphics = new PIXI.Graphics();

  // Circle
  graphics.lineStyle(2, 0x000000, 1);
  graphics.beginFill(0xFFFFFF, 1);
  graphics.drawEllipse(circle_data.x, circle_data.y, circle_data.width, circle_data.height);
  graphics.endFill();
  graphics.interactive = true;

  app.stage.addChild(graphics);
  const onDragStart = (event) => {
    if(callback()==='select'){
      graphics.alpha = 0.5;
      dragging = true;
    }
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

export {drawCircle};