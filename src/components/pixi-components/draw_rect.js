import * as PIXI from "pixi.js";

const drawRect = (rect_data, app, callback) => {
  var mouse = app.renderer.plugins.interaction.mouse.global;

  const graphics = new PIXI.Graphics();
  var dragging = false;
  var __double = false;
  var _clicked = false;

  // Rectangle
  graphics.lineStyle(2, 0x000000, 1);
  graphics.beginFill(0xFFFFFF);
  graphics.drawRect(rect_data.x, rect_data.y, rect_data.width, rect_data.height);
  graphics.interactive = true;

  graphics.click = (e) => {
    callback('rectangle', rect_data)
  }
  graphics.endFill();

  let xs = [rect_data.x, rect_data.x+graphics.width, rect_data.x+graphics.width, rect_data.x]
  let ys = [rect_data.y, rect_data.y, rect_data.y+graphics.height, rect_data.y+graphics.height]
  for(let i=0; i<4; i++)
  {
    let handle = new PIXI.Graphics();
    handle.lineStyle(2, 0x006EFF, 1);
    handle.beginFill(0xFFFFFF, 1);

    handle.drawRect(xs[i]-5, ys[i]-5, 10, 10);
    handle.alpha = 1
    handle.endFill();
    graphics.addChild(handle)
  }

  app.stage.addChild(graphics);
  
  const onDragStart = (event) => {
    if(callback()==='select'){
      graphics.alpha = 0.5;
      graphics.pivot.set(mouse.x, mouse.y);
      dragging = true;

      // Check for double click
      if(_clicked){
        alert('double click in 600ms detected, you can emit or call method related!');
        dragging = false;
      }
      _clicked = false;
      clearTimeout(__double);
    }
  }

  const onDragEnd = (event) => {
    dragging = false;
    graphics.alpha = 1;

    // Check for double click
    _clicked = true;
    __double = setTimeout(() => { _clicked = false; }, 600); // time for double click detection
  }

  const onDragMove = (event) => {
    if(dragging){
      graphics.position.set(mouse.x, mouse.y)
    }
  }

  // Check for right click
  const right = (e) => {
    alert('That was a right click!');
    dragging = false;
    graphics.alpha = 1;
  }

  // graphics.added = () => {
  //   console.log('here')
  //   let xs = [0, graphics.width, graphics.width, 0]
  //   let ys = [0, 0, graphics.height, graphics.height]
  //   for(let i=0; i<4; i++)
  //   {
  //     let handle = new PIXI.Graphics();
  //     handle.lineStyle(2, 0x006EFF, 1);
  //     handle.beginFill(0xFFFFFF, 1);

  //     handle.drawRect(xs[i]-5, ys[i]-5, 10, 10);
  //     handle.alpha = 1
  //     handle.endFill();
  //     graphics.addChild(handle)
  //   }
  // }

  // graphics.pointerdown=clickcheck;
  // graphics.pointerup = onDragEnd;
  // graphics.pointerupoutside = onDragEnd;
  // graphics.pointermove = onDragMove;

  graphics.mousedown=onDragStart;
  graphics.touchstart = onDragStart;
  graphics.mouseup = onDragEnd;
  graphics.mouseupoutside = onDragEnd;
  graphics.touchend = onDragEnd;
  graphics.touchendoutside = onDragEnd;
  graphics.mousemove = onDragMove;
  graphics.touchmove = onDragMove;

  // For right click
  graphics.rightdown = right;
  graphics.rightup = right;
  // graphics.rightupoutside = right;
  graphics.rightclick = right;
}

export {drawRect};