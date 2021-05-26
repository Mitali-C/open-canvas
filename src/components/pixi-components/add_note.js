import Quill from 'quill';
import * as PIXI from "pixi.js";

// To render html - https://www.npmjs.com/package/@pixi/text-html

const add_note = (note_data, app, callback) => {
  var mouse = app.renderer.plugins.interaction.mouse.global;
  var dragging = false;
  var moving_started = false;
  var __double = false;
  var _clicked = false;


  const textSprite = new PIXI.Text(`Click to enter`, {
    fill:"#000",
    fontSize:'14px',
    // whiteSpace:'pre-line',
    wordWrap:true,
    leading:-6,
    width:200, 
    height:200,
    breakWords:true,
    wordWrapWidth: 200,
  });

  const txtBG = new PIXI.Sprite(PIXI.Texture.WHITE);
  txtBG.width = 200;
  txtBG.height = 200;
  txtBG.tint = 0xb0e0e6;
  // cage text
  const cage = new PIXI.Container();
  cage.addChild(txtBG,textSprite);
  app.stage.addChild(cage)
  // add reference for easy debug
  cage.name = "textSprite";
  cage.textSprite = textSprite;
  cage.txtBG = txtBG;
  cage.x = note_data.x;
  cage.y = note_data.y;
  cage.interactive = true;



  const right = (e) => {
    console.log('right');
    alert('That was a right click!');
    cage.alpha = 1;
    dragging = false;
  }

  const onDragStart = (event) => {
    if(callback()==='select'){
      cage.alpha = 0.5;
      // cage.pivot.set(mouse.x, mouse.y);
      dragging = true;

      // Check for double click
      if(_clicked){
        alert('double click in 200ms detected, you can emit or call method related!');
        dragging = false;
        cage.alpha = 1;
      }
      _clicked = false;
      clearTimeout(__double);
    }
  }

  const onDragEnd = (event) => {

    // Check for double click
    _clicked = true;
    __double = setTimeout(() => { 
      _clicked = false; 
      console.log('detecting...')
    }, 200); // time for double click detection
    if(!moving_started){
      var el = document.getElementById('note-editor');
      el.style.position = "absolute";
      el.style.left = cage.x + 'px';
      el.style.top = cage.y + 'px';
      el.style.backgroundColor = '#b0e0e6';
      el.style.width = '200px';
      el.style.height = '200px';
      el.style.color = '#000';
      var quill = new Quill('#note-editor', {
        modules: {
          toolbar: [
            [{ header: [8, 2, false] }],
            ['bold', 'italic', 'underline'],
            ['image', 'code-block']
          ]
        },
        placeholder: 'Compose an epic...',
        theme: 'snow'  // or 'bubble'
      });
      quill.on('text-change', function(delta, oldDelta, source) {
        textSprite.updateText(quill.root.innerHTML);
        textSprite.text = quill.root.innerText
      });
      quill.focus();

      quill.off('text-change', ()=>{
        console.log('removed')
      });

      if(!quill.hasFocus()){
        el.style.display = 'none';
      }
    }
    dragging = false;
    cage.alpha = 1;
    moving_started = false;
  }

  const onDragMove = (event) => {
    if(dragging){
      cage.position.set(mouse.x, mouse.y);
      moving_started = true;
    }
  }


  cage.mousedown=onDragStart;
  cage.touchstart = onDragStart;
  cage.mouseup = onDragEnd;
  cage.mouseupoutside = onDragEnd;
  cage.touchend = onDragEnd;
  cage.touchendoutside = onDragEnd;
  cage.mousemove = onDragMove;
  cage.touchmove = onDragMove;
  // For right click
  cage.rightdown = right;
  cage.rightup = right;
  // cage.rightupoutside = right;
  cage.rightclick = right;


  // var el = document.getElementById('note-editor');
  // el.style.position = "absolute";
  // el.style.left = cage.x + 'px';
  // el.style.top = cage.y + 'px';
  // el.style.backgroundColor = '#b0e0e6';
  // el.style.width = '200px';
  // el.style.height = '200px';
  // el.style.color = '#000';

  /** REMOVE THE COMMENT IF TOOLBAR NEEDS TO BE DISPLAYED */
//   var toolbar = document.getElementsByClassName('ql-toolbar');
//   console.log(toolbar[0]);
//   setTimeout(function(){
//     toolbar[0].style.position = 'absolute';
//     toolbar[0].style.left = note_data.x + 'px';
//     toolbar[0].style.top = note_data.y + 'px';
// }, 1000);

  // var quill = new Quill('#note-editor', {
  //   modules: {
  //     toolbar: [
  //       [{ header: [8, 2, false] }],
  //       ['bold', 'italic', 'underline'],
  //       ['image', 'code-block']
  //     ]
  //   },
  //   placeholder: 'Compose an epic...',
  //   theme: 'snow'  // or 'bubble'
  // });
  // quill.on('text-change', function(delta, oldDelta, source) {
  //   textSprite.updateText(quill.root.innerHTML);
  //   textSprite.text = quill.root.innerText
  // });
}

export {add_note};