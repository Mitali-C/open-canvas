import React from 'react';
import * as PIXI from "pixi.js";
import circle_icon from '../../assets/icons/circle.png';
import rectangle_icon from '../../assets/icons/rectangle.png';
import pen_icon from '../../assets/icons/pen.png'; 
import select_icon from '../../assets/icons/cursor.png';
import image_icon from '../../assets/icons/image_icon.png';
import text_icon from '../../assets/icons/text.png';
import note_icon from '../../assets/icons/note.png';
import {drawRect} from './draw_rect';
import {drawCircle} from './draw_circle';
import {freehand} from './free_hand';
import {add_image} from './add_image';
import {add_text} from './add_text';
import {add_note} from './add_note';
import {data as image_data} from './temp_images';
import { v4 as uuidv4 } from 'uuid';
import './pixi.scss';

let app = new PIXI.Application({ 
  width: window.innerWidth, 
  height: window.innerHeight,                       
  antialias: true, 
  transparent: true, 
  // backgroundColor:0x1099bb
  // resolution: 1,
}
);

class PixiComponents extends React.Component {
  state = {
    mouse_position:{},
    tool:'select',
    retangles:{},
    circles:{},
    drawing:false,
    rectangles:[],
    selected:{},
    images:{},
    images_list:[],
    show_image_modal: false,
  }

  componentDidMount(){
    document.addEventListener('contextmenu', e => {
      e.preventDefault();
   });
    let temp_img_list = [];
    for(let i =0 ; i<image_data.length; i++){
      temp_img_list.push(image_data[i].urls.thumb);
    }
    this.setState({images_list: temp_img_list});
  
    //Add the canvas that Pixi automatically created for you to the HTML document
    document.querySelector('#pxrender').appendChild(app.view);
    app.renderer.autoDensity = true;
  
  }

  renderToolbar = () => {
    return(
      <div className="toolbar-container">
      <div className="icon-container" onClick={()=>{this.setState({tool:'select'})}}>
        <img src={select_icon} alt="select"></img>
      </div>
      <div className="icon-container" onClick={()=>{
        this.setState({tool:'image'});
      }}>
        <img src={image_icon} alt="text"></img>
      </div>
      <div className="icon-container" onClick={()=>{
        this.setState({tool:'text'});
      }}>
        <img src={text_icon} alt="text"></img>
      </div>
      <div className="icon-container" onClick={()=>{
        this.setState({tool:'note'});
      }}>
        <img src={note_icon} alt="text"></img>
      </div>
      <div className="icon-container" onClick={()=>{this.setState({tool:'pen'})}}>
        <img src={pen_icon} alt="pen"></img>
      </div>
      <div className="icon-container" onClick={()=>{
        this.setState({tool:'shape', shape_type:'circle'})
      }}>
        <img src={circle_icon} alt="circle"></img>
      </div>
      <div className="icon-container" onClick={()=>{
        this.setState({tool:'shape', shape_type:'rectangle'})
      }}>
        <img src={rectangle_icon} alt="rectangle"></img>
      </div>
    </div>
    )
  }

  onMouseMove = (e) => {
    this.setState({mouse_position:{x:e.screenX, y:e.screenY}})
  }

  getCursorType = () => {
    switch(this.state.tool){
      case 'select':
        return 'pointer'
      case 'pen':
        return 'pointer'
      case 'eraser':
        return 'pointer'
      case 'shape':
        return 'crosshair'
      default:
        return 'pointer'
    }
  }

  callback = () => {
    return this.state.tool;
  }

  onMouseDown = (e) => {
    switch(this.state.tool){
      case "image":
        const img_id = uuidv4();
        const image_index = (Math.random() * (30 - 0) + 0).toFixed(0);
        let temp_img_data = {x:e.pageX, y:e.pageY, width:100, height:100, id:img_id, source:this.state.images_list[image_index]};
        let temp_images = this.state.images;
        temp_images[img_id] = temp_img_data;
        this.setState({images: temp_images});
        add_image(temp_img_data, app, this.callback);
        break;
      case "text":
        const text_data = {
          x: e.pageX,
          y: e.pageY
        }
        add_text(text_data, app);
        this.setState({tool:'select'})
        break;
      case "note":
        const note_data = {
          x: e.pageX,
          y: e.pageY
        }
        add_note(note_data, app, this.callback);
        this.setState({tool:'select'})
        break;
      case "pen":
        freehand(e.pageX, e.pageY, app)
        break;
      case 'shape':
        switch(this.state.shape_type){
          case 'rectangle':
            const id = uuidv4();
            let temp = {x:e.pageX, y:e.pageY, width:100, height:100, id:id};
            let temp_rects = this.state.rectangles;
            temp_rects[id] = temp;
            this.setState({rectangles: temp_rects})
            drawRect(temp, app, this.callback);
            break;
          case "circle":
            const circle_id = uuidv4();
            let tempc = {x:e.pageX, y:e.pageY, width:100, height:100, id:circle_id};
            let temp_circles = this.state.circles;
            temp_circles[circle_id] = tempc;
            this.setState({circles: temp_circles})
            drawCircle(tempc, app, this.callback);
            break;
          default:
            break;
        }
        break;
      default:
        break;
    }
  }
  
  render() {
    return (
      <div className="pixi">
        {this.renderToolbar()}
        <div 
          onMouseMove={this.onMouseMove}
          onMouseDown={this.onMouseDown}
          onMouseUp={this.onMouseUp}
          style={{
            cursor:this.getCursorType()
          }}
          ref="pxrender" 
          id="pxrender">
        </div>
        <div id="note-editor"></div>
        {/* <div className="control-panel">
          control panel
        </div> */}
      </div>
    )
  }
}

export default PixiComponents;