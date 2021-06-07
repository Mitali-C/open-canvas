/* eslint-disable no-loop-func */
import * as PIXI from "pixi.js";

const Transformer = (parent, mouse, stopDragFn) => {
  const bounds = parent.getLocalBounds();
  let xs = [bounds.x, bounds.x+parent.width, bounds.x+parent.width, bounds.x]
  let ys = [bounds.y, bounds.y, bounds.y+parent.height, bounds.y+parent.height]
  // console.log(xs, ys)
  top_left(xs[0]-5, ys[0]-5, 10, 10, parent, mouse, stopDragFn);
  top_right(xs[1]-5, ys[1]-5, 10, 10, parent, mouse, stopDragFn);
  bottom_right(xs[2]-5, ys[2]-5, 10, 10, parent, mouse, stopDragFn);
  bottom_left(xs[3]-5, ys[3]-5, 10, 10, parent, mouse, stopDragFn);
}

const bottom_left = (x, y, width, height, parent, mouse, stopDrag) => {
  var handle_drag = false;

  let handle = new PIXI.Graphics();
  handle.lineStyle(2, 0x006EFF, 1);
  handle.beginFill(0xFFFFFF, 1);

  handle.drawRect(x, y, width, height);
  handle.alpha = 1
  handle.endFill();
  handle.interactive = true;
  parent.addChild(handle);


  /**-------------HANDLE CONTROLS-------------------- */
  const handleDragStart = (event) => {
    // if(callback()==='select'){
      handle_drag = true;
    // }
  }

  const handleDragEnd = (event) => {
    handle_drag = false;
  }

  const handleDragMove = (event) => {
    if(handle_drag){
      stopDrag();

      // X axis expand controls
      if(mouse.x < parent.position.x){
        parent.width = parent.width + (parent.position.x - mouse.x);
        parent.position.x = mouse.x;
      }
      else if(mouse.x > parent.position.x && mouse.x < (parent.position.x + parent.width)){
        parent.width = parent.width - (mouse.x - parent.position.x);
        parent.position.x = mouse.x;

      }

      // Y axis expand controls
      if(mouse.y < (parent.position.y + parent.height)){
        parent.height = mouse.y - parent.position.y;
        // parent.position.y = mouse.y;
      }
      else if(mouse.y > (parent.position.y + parent.height)){
        parent.height = mouse.y + parent.position.y;
      }
    }
  }

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

const bottom_right = (x, y, width, height, parent, mouse, stopDrag) => {
  var handle_drag = false;

  let handle = new PIXI.Graphics();
  handle.lineStyle(2, 0x006EFF, 1);
  handle.beginFill(0xFFFFFF, 1);

  handle.drawRect(x, y, width, height);
  handle.alpha = 1
  handle.endFill();
  handle.interactive = true;
  parent.addChild(handle);


  /**-------------HANDLE CONTROLS-------------------- */
  const handleDragStart = (event) => {
    // if(callback()==='select'){
      handle_drag = true;
    // }
  }

  const handleDragEnd = (event) => {
    handle_drag = false;
  }

  const handleDragMove = (event) => {
    if(handle_drag){
      stopDrag();

      // X axis expand controls
      if(mouse.x > (parent.position.x + parent.width)){
        parent.width = parent.width + (mouse.x - (parent.position.x + parent.width));
      }
      else if(mouse.x < (parent.position.x + parent.width)){
        parent.width = mouse.x - parent.position.x;
      }

      // Y axis expand controls
      if(mouse.y < (parent.position.y + parent.height)){
        parent.height = mouse.y - parent.position.y;
        // parent.position.y = mouse.y;
      }
      else if(mouse.y > (parent.position.y + parent.height)){
        parent.height = mouse.y + parent.position.y;
      }
    }
  }

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

const top_left = (x, y, width, height, parent, mouse, stopDrag) => {
  var handle_drag = false;

  let handle = new PIXI.Graphics();
  handle.lineStyle(2, 0x006EFF, 1);
  handle.beginFill(0xFFFFFF, 1);

  handle.drawRect(x, y, width, height);
  handle.alpha = 1
  handle.endFill();
  handle.interactive = true;
  parent.addChild(handle);


  /**-------------HANDLE CONTROLS-------------------- */
  const handleDragStart = (event) => {
    // if(callback()==='select'){
      handle_drag = true;
    // }
  }

  const handleDragEnd = (event) => {
    handle_drag = false;
  }

  const handleDragMove = (event) => {
    if(handle_drag){
      // dragging = false;
      stopDrag();

      // X axis expand controls
      if(mouse.x < parent.position.x){
        console.log('x-1')
        parent.width = parent.width + (parent.position.x - mouse.x);
        parent.position.x = mouse.x;
      }
      else if(mouse.x > parent.position.x && mouse.x < (parent.position.x + parent.width)){
        parent.width = parent.width - (mouse.x - parent.position.x);
        parent.position.x = mouse.x;

      }
      else if(mouse.x > (parent.position.x + parent.width)){
        parent.width = parent.width + (mouse.x - (parent.position.x + parent.width));
      }

      // // Y axis expand controls
      if(mouse.y < parent.position.y){
        parent.height = parent.height + (parent.position.y - mouse.y);
        parent.position.y = mouse.y;
      }
      else if(mouse.y > parent.position.y && mouse.y < (parent.position.y + parent.height)){
        parent.height = parent.height - (mouse.y - parent.position.y);
        parent.position.y = mouse.y;
      }
      else if(mouse.y > (parent.position.y + parent.height)){
        parent.height = (mouse.y - parent.position.y) - (parent.height - parent.position.y);
      }
    }
  }

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

const top_right = (x, y, width, height, parent, mouse, stopDrag) => {
  var handle_drag = false;

  let handle = new PIXI.Graphics();
  handle.lineStyle(2, 0x006EFF, 1);
  handle.beginFill(0xFFFFFF, 1);

  handle.drawRect(x, y, width, height);
  handle.alpha = 1
  handle.endFill();
  handle.interactive = true;
  parent.addChild(handle);


  /**-------------HANDLE CONTROLS-------------------- */
  const handleDragStart = (event) => {
    // if(callback()==='select'){
      handle_drag = true;
    // }
  }

  const handleDragEnd = (event) => {
    handle_drag = false;
  }

  const handleDragMove = (event) => {
    if(handle_drag){
      // dragging = false;
      stopDrag();

      // X axis expand controls
      if(mouse.x > (parent.position.x + parent.width)){
        parent.width = parent.width + (mouse.x - (parent.position.x + parent.width));
      }
      else if(mouse.x < (parent.position.x + parent.width)){
        parent.width = mouse.x - parent.position.x;
      }

      // // Y axis expand controls
      if(mouse.y < parent.position.y){
        parent.height = parent.height + (parent.position.y - mouse.y);
        parent.position.y = mouse.y;
      }
      else if(mouse.y > parent.position.y && mouse.y < (parent.position.y + parent.height)){
        parent.height = parent.height - (mouse.y - parent.position.y);
        parent.position.y = mouse.y;
      }
    }
  }

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

export {Transformer};