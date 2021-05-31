/* eslint-disable no-loop-func */
import * as PIXI from "pixi.js";

const add_image = (img_data, app, callback) => {
  var mouse = app.renderer.plugins.interaction.mouse.global;
  var dragging = false;
  var __double = false;
  var _clicked = false;
  // var _selected = false;

  var mouse_start_x = 0
  var mouse_start_y = 0

  var temp_image = PIXI.Sprite.from(img_data.source);
  
  // center the sprite anchor point
  temp_image.anchor.x = 0;
  temp_image.anchor.y = 0;
  
  // move the sprite to the center of the canvas
  temp_image.position.x = img_data.x;
  temp_image.position.y = img_data.y;
  temp_image.interactive = true;

  // ------------- BOUNDING BOXES ---------------------
  const graphics = new PIXI.Graphics();

  var handle_drag = false;

  temp_image.on('added', () => {
    console.log("Loaded")
    // Rectangle
    graphics.lineStyle(2, 0x006EFF, 1);
    graphics.beginFill(0xFFFFFF, 0);
    console.log(temp_image)
    graphics.drawRect(0, 0, temp_image.width, temp_image.height);
    graphics.alpha = 1
    graphics.endFill();

    temp_image.addChild(graphics)
    setTimeout(() => {  
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
        handle.interactive = true;
        temp_image.addChild(handle);
        handle.on('mousedown', handleDragStart);
        handle.on('touchstart', handleDragStart);
        handle.on('pointerdown', handleDragStart);
        handle.on('mouseup', handleDragEnd);
        handle.on('mouseupoutside', handleDragEnd);
        handle.on('touchend', handleDragEnd);
        handle.on('touchendoutside', handleDragEnd);
        handle.on('pointerup', handleDragEnd);
        handle.on('pointerupoutside', handleDragEnd);
        handle.on('mousemove', handleDragMove);
        handle.on('touchmove', handleDragMove);
        handle.on('pointermove', handleDragMove);
      }
     }, 150);
  });

  /**-------------HANDLE CONTROLS-------------------- */
  const handleDragStart = (event) => {
    if(callback()==='select'){
      handle_drag = true;
    }
  }

  const handleDragEnd = (event) => {
    handle_drag = false;
    console.log('mouse up!')
  }

  const handleDragMove = (event) => {
    if(handle_drag){
      dragging = false;

      // X axis expand controls
      if(mouse.x < temp_image.position.x){
        console.log('X - 1')
        temp_image.width = temp_image.width + (temp_image.position.x - mouse.x);
        temp_image.position.x = mouse.x;
      }
      else if(mouse.x > temp_image.position.x && mouse.x < (temp_image.position.x + temp_image.width)){
        console.log('X - 2')
        temp_image.width = temp_image.width - (mouse.x - temp_image.position.x);
        temp_image.position.x = mouse.x;

      }
      else if(mouse.x > (temp_image.position.x + temp_image.width)){
        console.log('X - 3', );
        temp_image.width = temp_image.width + (mouse.x - (temp_image.position.x + temp_image.width));
      }

      // // Y axis expand controls
      if(mouse.y < temp_image.position.y){
        console.log('Y - 1');
        temp_image.height = temp_image.height + (temp_image.position.y - mouse.y);
        temp_image.position.y = mouse.y;
      }
      else if(mouse.y > temp_image.position.y && mouse.y < (temp_image.position.y + temp_image.height)){
        console.log('Y - 2');
        temp_image.height = temp_image.height - (mouse.y - temp_image.position.y);
        temp_image.position.y = mouse.y;
      }
      else if(mouse.y > (temp_image.position.y + temp_image.height)){
        console.log('Y - 3');
        temp_image.height = (mouse.y - temp_image.position.y) - (temp_image.height - temp_image.position.y);
      }
    }
  }

  app.stage.addChild(temp_image);

  // --------------- DRAGGING IMAGE ---------------------------
  const onDragStart = (event) => {
    if(callback() === 'select'){ 
      mouse_start_x = mouse.x
      mouse_start_y = mouse.y

      temp_image.alpha = 0.5;
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
    temp_image.alpha = 1;
    mouse_start_x = 0
    mouse_start_y = 0

    // Check for double click
    _clicked = true;
    // _selected = true;
    __double = setTimeout(() => { _clicked = false; }, 150); // time for double click detection
  }

  const onDragMove = (event) => {
    if(dragging){

      let start_x = temp_image.position.x
      let start_y = temp_image.position.y

      let delX = mouse.x - mouse_start_x
      let delY = mouse.y - mouse_start_y

      temp_image.position.set(start_x + delX, start_y + delY);

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