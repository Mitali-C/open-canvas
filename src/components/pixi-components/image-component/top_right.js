/* eslint-disable no-loop-func */
import * as PIXI from "pixi.js";

const top_right = (x, y, width, height, image, app, callback, stopDrag) => {
  var mouse = app.renderer.plugins.interaction.mouse.global;
  var handle_drag = false;

  let handle = new PIXI.Graphics();
  handle.lineStyle(2, 0x006EFF, 1);
  handle.beginFill(0xFFFFFF, 1);

  handle.drawRect(x, y, width, height);
  handle.alpha = 1
  handle.endFill();
  handle.interactive = true;
  image.addChild(handle);


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
      // dragging = false;
      stopDrag();

      // X axis expand controls
      if(mouse.x > (image.position.x + image.width)){
        console.log('X - 1', );
        image.width = image.width + (mouse.x - (image.position.x + image.width));
      }
      else if(mouse.x < (image.position.x + image.width)){
        console.log('X - 2', );
        image.width = mouse.x - image.position.x;
      }

      // // Y axis expand controls
      if(mouse.y < image.position.y){
        console.log('Y - 1');
        image.height = image.height + (image.position.y - mouse.y);
        image.position.y = mouse.y;
      }
      else if(mouse.y > image.position.y && mouse.y < (image.position.y + image.height)){
        console.log('Y - 2');
        image.height = image.height - (mouse.y - image.position.y);
        image.position.y = mouse.y;
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

export {top_right};