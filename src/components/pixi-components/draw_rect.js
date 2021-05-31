import * as PIXI from "pixi.js";

const drawRect = (rect_data, app, callback) => {
  var mouse = app.renderer.plugins.interaction.mouse.global;
  let bounds_drawn = false;

  const graphics = new PIXI.Graphics();
  var dragging = false;
  var __double = false;
  var _clicked = false;

  var mouse_start_x = 0
  var mouse_start_y = 0

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
    if(callback()==='select'){
      mouse_start_x = mouse.x
      mouse_start_y = mouse.y
      graphics.alpha = 0.5;
      graphics.pivot.set(mouse.x, mouse.y);
      dragging = true;

      // Check for double click
      if(_clicked){
        alert('double click in 150ms detected, you can emit or call method related!');
        dragging = false;
      }
      _clicked = false;
      clearTimeout(__double);
    }
  }

  const onDragEnd = (event) => {
    dragging = false;
    graphics.alpha = 1;
    mouse_start_x = 0
    mouse_start_y = 0

    // Check for double click
    _clicked = true;
    __double = setTimeout(() => { _clicked = false; }, 150); // time for double click detection
    if(!bounds_drawn) {
      drawBounds();
    }
  }

  const onDragMove = (event) => {
    if(dragging){

      let start_x = graphics.position.x;
      let start_y = graphics.position.y;

      let delX = mouse.x - mouse_start_x;
      let delY = mouse.y - mouse_start_y;
      graphics.position.set(start_x + delX, start_y + delY);

      mouse_start_x = mouse.x
      mouse_start_y = mouse.y
    }
  }

  let handle = new PIXI.Graphics();

  const drawBounds = () => {
    const bounds = graphics.getLocalBounds();
    let xs = [bounds.x, bounds.x+bounds.width, bounds.x+bounds.width, bounds.x]
    let ys = [bounds.y, bounds.y, bounds.y+bounds.height, bounds.y+bounds.height]
    for(let i=0; i<4; i++)
    {
      // let handle = new PIXI.Graphics();
      handle.lineStyle(2, 0x006EFF, 1);
      handle.beginFill(0xFFFFFF, 1);
      handle.drawRect(xs[i]-5, ys[i]-5, 10, 10);
      handle.alpha = 1
      handle.endFill();
      handle.interactive = true;
      graphics.addChild(handle);
      // drag interactions
      handle.mousedown=onHandleDragStart;
      handle.touchstart = onHandleDragStart;
      handle.mouseup = onHandleDragEnd;
      handle.mouseupoutside = onHandleDragEnd;
      handle.touchend = onHandleDragEnd;
      handle.touchendoutside = onHandleDragEnd;
      handle.mousemove = onHandleDragMove;
      handle.touchmove = onHandleDragMove;
    }
    bounds_drawn = true;
  }

  const onHandleDragStart = (event) => {
    if(callback()==='select'){
      console.log('handle clicked');
      // handle.alpha = 0.5;
      // handle.pivot.set(mouse.x, mouse.y);
      // dragging = true;
    }
  }

  const onHandleDragMove = (event) => {

  }

  const onHandleDragEnd = (event) => {

  }

  // Check for right click
  const right = (e) => {
    alert('That was a right click!');
    dragging = false;
    graphics.alpha = 1;
  }


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