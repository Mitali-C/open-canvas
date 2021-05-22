import * as PIXI from "pixi.js";

const drawCircle = (x, y, app) => {
  console.log("creating circle:", x, y);
  const graphics = new PIXI.Graphics();

  // Circle
  graphics.lineStyle(2, 0x000000, 1);
  graphics.beginFill(0xFFFFFF, 1);
  graphics.drawCircle(x, y, 50);
  graphics.endFill();

  app.stage.addChild(graphics);
}

export {drawCircle};