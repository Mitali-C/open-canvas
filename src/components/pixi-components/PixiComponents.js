import React from 'react';
import * as PIXI from "pixi.js";
import circle_icon from '../../assets/icons/circle.png';
import rectangle_icon from '../../assets/icons/rectangle.png';
import pen_icon from '../../assets/icons/pen.png'; 
import select_icon from '../../assets/icons/cursor.png';
import {drawRect} from './draw_rect';
import {drawCircle} from './draw_circle';
import {freehand} from './free_hand';
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
    retangles:[
      {
        fill:0xDE3249,
        coords:{x:50, y:50, w:100, h:200}
      }
    ],
    drawing:false,
    rectangles:[]
  }

  componentDidMount(){
  
    //Add the canvas that Pixi automatically created for you to the HTML document
    document.querySelector('#pxrender').appendChild(app.view);
    app.renderer.autoDensity = true;
    for(let i=0; i<this.state.rectangles.length; i++){
      console.log("called!")
    }
  
  }

  renderToolbar = () => {
    return(

      <div className="toolbar-container">
      <div className="icon-container" onClick={()=>{this.setState({tool:'select'})}}>
        <img src={select_icon} alt="select"></img>
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
    console.log("back!")
  }

  onMouseDown = (e) => {
    console.log();
    switch(this.state.tool){
      case "pen":
        freehand(e.pageX, e.pageY, app)
        break;
      case 'shape':
        switch(this.state.shape_type){
          case 'rectangle':
            let temp = {x:e.pageX, y:e.pageY, width:100, height:100, id:uuidv4()};
            let temp_rects = this.state.rectangles;
            temp_rects.push(temp);
            this.setState({rectangles: temp_rects});
            drawRect(e.pageX, e.pageY, app, this.callback);
            break;
          case "circle":
            drawCircle(e.pageX, e.pageY, app);
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
      </div>
    )
  }
}

export default PixiComponents;