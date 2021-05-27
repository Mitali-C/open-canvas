import * as PIXI from "pixi.js";

const add_image = (img_data, app, callback) => {
  var mouse = app.renderer.plugins.interaction.mouse.global;
  app.renderer.plugins.interaction.on("click", () => {console.log("Click event")})
  // console.log(mouse)
  var dragging = false;
  var __double = false;
  var _clicked = false;
  var _selected = false;

  var mouse_start_x = 0
  var mouse_start_y = 0

  var temp_image = PIXI.Sprite.from(img_data.source)
  const graphics = new PIXI.Graphics();

  temp_image.on('added', () => {
    console.log("Loaded")
    // Rectangle
    graphics.lineStyle(2, 0x006EFF, 1);
    graphics.beginFill(0xFFFFFF, 0);
    // console.log("Temp Image", temp_image._width, temp_imaeg_height)
    console.log(temp_image)
    graphics.drawRect(0, 0, temp_image.width, temp_image.height);
    graphics.alpha = 1
    // graphics.interactive = true;

    // graphics.click = (e) => {
    //   callback('rectangle', rect_data)
    // }
    graphics.endFill();

    // app.stage.addChild(graphics);
    temp_image.addChild(graphics)


    let xs = [0, temp_image.width, temp_image.width, 0]
    let ys = [0, 0, temp_image.height, temp_image.height]
    for(let i=0; i<4; i++)
    {
      let handle = new PIXI.Graphics();
      handle.lineStyle(2, 0x006EFF, 1);
      handle.beginFill(0xFFFFFF, 1);

      handle.drawRect(xs[i]-5, ys[i]-5, 10, 10);
      handle.alpha = 1
      handle.endFill();
      temp_image.addChild(handle)
    }
    



  })
  
  // center the sprite anchor point
  temp_image.anchor.x = 0;
  temp_image.anchor.y = 0;
  
  // move the sprite to the center of the canvas
  temp_image.position.x = img_data.x;
  temp_image.position.y = img_data.y;
  temp_image.interactive = true;

  // console.log("Temp Image", temp_image._width, temp_image._height)
  // console.log("Temp Image", temp_image.width, temp_image.height)

  app.stage.addChild(temp_image);
  // console.log(app)
  // console.log(temp_image.texture)

  
  



  const addBoundingBox = () => {
    // console.log(graphics)
    // graphics.alpha = 1
    console.log(temp_image.getLocalBounds())
  }

  const onDragStart = (event) => {
    if(callback() === 'select'){ 
      
      // console.log(mouse)
      mouse_start_x = mouse.x
      mouse_start_y = mouse.y

      temp_image.alpha = 0.5;
      dragging = true;

      // console.log(temp_image.width, temp_image.height)
      addBoundingBox()

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
    temp_image.alpha = 1;
    mouse_start_x = 0
    mouse_start_y = 0

    // Check for double click
    _clicked = true;
    // _selected = true;
    __double = setTimeout(() => { _clicked = false; }, 600); // time for double click detection
  }

  const onDragMove = (event) => {
    if(dragging){

      let start_x = temp_image.position.x
      let start_y = temp_image.position.y

      let delX = mouse.x - mouse_start_x
      let delY = mouse.y - mouse_start_y

      // console.log(mouse)
      // console.log(delX)
      // console.log(delY)

      temp_image.position.set(start_x + delX, start_y + delY)

      // graphics.position.set(start_x + delX, start_y + delY)
      
      // graphics.position.set(start_x + delX, start_y + delY)
      // console.log(graphics)

      mouse_start_x = mouse.x
      mouse_start_y = mouse.y
    }
  }

  const right = (e) => {
    console.log('right');
    alert('That was a right click!');
    temp_image.alpha = 1;
    dragging = false;
  }

  temp_image.on('mousedown', onDragStart);
  temp_image.on('touchstart', onDragStart);
  temp_image.on('pointerdown', onDragStart);
  temp_image.on('mouseup', onDragEnd);
  temp_image.on('mouseupoutside', onDragEnd);
  temp_image.on('touchend', onDragEnd);
  temp_image.on('touchendoutside', onDragEnd);
  temp_image.on('pointerup', onDragEnd);
  temp_image.on('pointerupoutside', onDragEnd);
  temp_image.on('mousemove', onDragMove);
  temp_image.on('touchmove', onDragMove);
  temp_image.on('pointermove', onDragMove);
  // right click handlers
  temp_image.on('rightdown', right);
  temp_image.on('rightup', right);
  // temp_image.on('rightupoutside', right);
  temp_image.on('rightclick', right);
}

export {add_image};