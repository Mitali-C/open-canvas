import * as PIXI from "pixi.js";
import BaseObject from './base_object';
import Quill from 'quill';

class Text extends BaseObject{
  constructor(app, note_data)
  {
      super(app);
      this.note_data = note_data;
      this.mouse = app.renderer.plugins.interaction.mouse.global;
      this.addNote();
  }
  
  addNote(){
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
    // add reference for easy debug
    cage.name = "textSprite";
    cage.textSprite = textSprite;
    cage.txtBG = txtBG;
    cage.x = this.note_data.x;
    cage.y = this.note_data.y;
    cage.interactive = true;
    this.app.stage.addChild(cage);
    this.displayObject = cage;

    const addEditor = () => {
      var el = document.getElementById('note-editor');
        el.style.position = "absolute";
        el.style.left = cage.x + 'px';
        el.style.top = cage.y + 'px';
        el.style.backgroundColor = '#b0e0e6';
        el.style.width = cage.width + 'px';
        el.style.height = cage.height + 'px';
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

    cage.on('click', (e)=>{
      this.onClick();
      addEditor();
    })
  }
}

export default Text;