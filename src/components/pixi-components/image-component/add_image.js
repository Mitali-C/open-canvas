/* eslint-disable no-loop-func */
import * as PIXI from "pixi.js";
import {top_left} from './top_left';
import {top_right} from './top_right';
import {bottom_right} from './bottom_right';
import {bottom_left} from './bottom_left';

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

  const stopDrag = () => {
    dragging =false;
  }

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
      top_left(xs[0]-5, ys[0]-5, 10, 10, temp_image, app, callback, stopDrag);
      top_right(xs[1]-5, ys[1]-5, 10, 10, temp_image, app, callback, stopDrag);
      bottom_right(xs[2]-5, ys[2]-5, 10, 10, temp_image, app, callback, stopDrag);
      bottom_left(xs[3]-5, ys[3]-5, 10, 10, temp_image, app, callback, stopDrag);
     }, 150);
  });

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