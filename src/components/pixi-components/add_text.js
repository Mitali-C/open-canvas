// Doc - https://github.com/Mwni/PIXI.TextInput

import * as PIXI from "pixi.js";
const TextInput = require('pixi-text-input');

const add_text = (text_data ,app) => {
  const generateBox = (w, h , state) => {
    var box = new PIXI.Container();
    var mask = new PIXI.Graphics()
  
  
    mask.beginFill(0x5714AC)
    mask.drawRoundedRect(0,0,w,h,36);

    box.addChild(mask);

    switch(state){
      case 'DEFAULT':
        mask.tint = 0xffffff
        break;
      case 'FOCUSED':
        mask.tint = 0x7EDFFF
        break;
      case 'DISABLED':
        mask.alpha = 0.5
        break;
      default:
        break;
    }
  
    return box
  }
  
  var input = new TextInput({
		input: {
			fontFamily: 'Arial',
			fontSize: '12px',
			padding: '8px 16px',
			width: '200px',
			color: 'white'
		},
    box: generateBox
  })
  input.x = text_data.x
  input.y = text_data.y
  input.placeholder = 'Enter your Text...'
  app.stage.addChild(input)
  input.focus();

}



export {add_text};