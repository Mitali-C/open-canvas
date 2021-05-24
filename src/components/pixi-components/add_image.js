import * as PIXI from "pixi.js";

const add_image = (img_data, app, callback) => {
  var mouse = app.renderer.plugins.interaction.mouse.global;
  var dragging = false;

  var temp_image = PIXI.Sprite.from(img_data.source)
    
  // center the sprite anchor point
  temp_image.anchor.x = 0;
  temp_image.anchor.y = 0;
  
  // move the sprite to the center of the canvas
  temp_image.position.x = img_data.x;
  temp_image.position.y = img_data.y;
  temp_image.interactive = true;
  app.stage.addChild(temp_image);


  const onDragStart = (event) => {
    if(callback() === 'select'){ 
      temp_image.alpha = 0.5;
      dragging = true;
    }
  }

  const onDragEnd = (event) => {
    dragging = false;
    temp_image.alpha = 1;
  }

  const onDragMove = (event) => {
    if(dragging){
      temp_image.position.set(mouse.x, mouse.y)
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