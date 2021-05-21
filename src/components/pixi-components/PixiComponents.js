import React from 'react';
import * as PIXI from "pixi.js";
import circle_icon from '../../assets/icons/circle.png';
import rectangle_icon from '../../assets/icons/rectangle.png';
import pen_icon from '../../assets/icons/pen.png'; 
import select_icon from '../../assets/icons/cursor.png';
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
    drawing:false
  }

  componentDidMount(){
  
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

  createRectangle = (x, y) => {
    console.log("creating rectangle");
    const graphics = new PIXI.Graphics();
    let clicked = false;

    // Rectangle
    graphics.lineStyle(2, 0x000000, 1);
    graphics.beginFill(0xFFFFFF);
    graphics.drawRect(x, y, 100, 100);
    graphics.interactive = true;
    graphics.buttonMode = true;
    
    graphics.pointertap=()=>{
      console.log('clicked:',)
      clicked = true;
    }
    graphics.pointerout = (e)=>{
      const coords = e.data.global;
      console.log('mouse move:', x - coords.x);
      if(clicked){
        console.log('here');
        // graphics.drawRect(coords.x, coords.y, 100, 100);
      }
    }
    graphics.endFill();

    app.stage.addChild(graphics);
  }

  createCircle = (x, y) => {
    console.log("creating circle");
    const graphics = new PIXI.Graphics();

    // Circle
    graphics.lineStyle(2, 0x000000, 1);
    graphics.beginFill(0xFFFFFF, 1);
    graphics.drawCircle(x, y, 50);
    graphics.endFill();

    app.stage.addChild(graphics);
  }

  write = (x, y) => {
    console.log("creating line", x);
    const graphics = new PIXI.Graphics();

    // free hand drawing
    graphics.lineStyle(3);
    graphics.beginFill(0xFFFFFF);
    graphics.moveTo(x, y);
    // graphics.lineTo(this.state.mouse_position.x, this.state.mouse_position.y)
    graphics.interactive = true;
    graphics.pointermove = (e) => {
      // console.log('mouse down', e.data.global);
      if(this.state.drawing){
        const coords = e.data.global;
        graphics.lineTo(coords.x, coords.y);
        graphics.moveTo(coords.x, coords.y);
      }
      // graphics.drawCircle(coords.x, coords.y, 2);
    }
    graphics.endFill();

    app.stage.addChild(graphics);
  }

  onMouseDown = (e) => {
    console.log();
    switch(this.state.tool){
      case "pen":
        this.setState({drawing:true},()=>{
          this.write(e.pageX, e.pageY);
        });
        
        break;
      case 'shape':
        switch(this.state.shape_type){
          case 'rectangle':
            this.createRectangle(e.pageX, e.pageY);
            break;
          case "circle":
            this.createCircle(e.pageX, e.pageY);
            break;
          default:
            break;
        }
        break;
      default:
        break;
    }
  }

  onMouseUp = () => {
    console.log("UP")
    if(this.state.tool==='pen'){
      this.setState({drawing:false});
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