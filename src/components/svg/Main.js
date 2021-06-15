import React from 'react';
import subjx from 'subjx';
import circle_icon from '../../assets/icons/circle.png';
import rectangle_icon from '../../assets/icons/rectangle.png';
import pen_icon from '../../assets/icons/pen.png'; 
import select_icon from '../../assets/icons/cursor.png';
import image_icon from '../../assets/icons/image_icon.png';
import text_icon from '../../assets/icons/text.png';
import note_icon from '../../assets/icons/note.png';
import 'subjx/dist/style/subjx.css';
import './main.scss';
import Rectangle from './Rectangle';
import { v4 as uuidv4 } from 'uuid';

class Main extends React.Component{
  state = {
    tool:"select",
    shape_type:'',
    rectangles: [

    ],
    selected_id:''
  }

  drawTransformer = () => {
    if(this.state.selected_id.length>0){
      // define methods
      const methods = {
        onInit(el) {
          console.log('init');
        },
        onMove({
          dx,
          dy
        }) {
          // subjx('#move > span')[0].innerHTML = `x: ${dx}px; y: ${dy}px`;
        },
        onResize({
          dx,
          dy
        }) {
          // subjx('#resize > span')[0].innerHTML = `x: ${dx}px; y: ${dy}px`;
        },
        onRotate({
          delta
        }) {
          // subjx('#rotate > span')[0].innerHTML = `${Math.floor(delta * 180 / Math.PI)}deg`;
        },
        onDrop() {
          console.log('is dropped');
        },
        onDestroy() {
          console.log('is destroyed');
        }
      };
  
      // additional options
      const svgOptions = {
        // container: '#svg-container',
        //restrict: '#svg-container',
        rotationPoint: true,
        snap: {
          x: 30,
          y: 30,
          angle: 25
        },
        ...methods
      };
      const svgs =
      subjx(`.drag-svg-${this.state.selected_id}`).drag(svgOptions);
      if(svgs){
        svgs.forEach(item => {
          subjx(item.controls).on('dblclick', () => {
            item.disable();
          });
        });
    
        // double click activating/deactivating the drag method
        subjx(`.drag-svg-${this.state.selected_id}`).on('dblclick', e => {
          if (e.currentTarget.classList.contains('sjx-drag')) return;
          const xDraggable = subjx(e.currentTarget).drag(svgOptions)[0];
          // adding event to controls
          const controls = xDraggable.controls;
          subjx(controls).on('dblclick', () => {
            console.log('double')
            xDraggable.disable();
          });
        });
      }
    }
  }

  removeTransformer = (id) => {
    console.log('removing...', id, this.state.selected_id)
    // if(id.length>0 && id===this.state.selected_id){
      // define methods
      const methods = {
        onInit(el) {
          console.log('init');
        },
        onMove({
          dx,
          dy
        }) {
          // subjx('#move > span')[0].innerHTML = `x: ${dx}px; y: ${dy}px`;
        },
        onResize({
          dx,
          dy
        }) {
          // subjx('#resize > span')[0].innerHTML = `x: ${dx}px; y: ${dy}px`;
        },
        onRotate({
          delta
        }) {
          // subjx('#rotate > span')[0].innerHTML = `${Math.floor(delta * 180 / Math.PI)}deg`;
        },
        onDrop() {
          console.log('is dropped');
        },
        onDestroy() {
          console.log('is destroyed', id);
        }
      };
  
      // additional options
      const svgOptions = {
        // container: '#svg-container',
        //restrict: '#svg-container',
        rotationPoint: true,
        snap: {
          x: 30,
          y: 30,
          angle: 25
        },
        ...methods
      };
      const svgs =
      subjx(`.drag-svg-${id}`).drag(svgOptions)
      console.log('svgs:', svgs)
      // svgs.disable();
      if(svgs){
        svgs.forEach(item => {
          item.disable();
        });
      }
    // }
  }

  selectId = (id) => {
    // this.removeTransformer(this.state.selected_id);
    this.setState({selected_id: id}, ()=>{
      this.drawTransformer()
    })
  }

  renderToolbar = () => {
    return(
      <div className="toolbar-container">
      <div className="icon-container" onClick={()=>{this.setState({tool:'select'})}}>
        <img src={select_icon} alt="select"></img>
      </div>
      {/* <div className="icon-container" onClick={()=>{
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
      </div> */}
      <div className="icon-container" onClick={()=>{
        this.setState({tool:'shape', shape_type:'rectangle'})
      }}>
        <img src={rectangle_icon} alt="rectangle"></img>
      </div>
    </div>
    )
  }

  onMouseDown = (e) => {
    console.log(e.pageX);
    switch(this.state.tool){
      case 'shape':
        switch(this.state.shape_type){
          case 'rectangle':
            let tempRects = this.state.rectangles;
            tempRects.push({x:e.pageX, y: e.pageY, width:100, height:100, id:uuidv4()});
            this.setState({rectangles: tempRects});
            break;
          default:
            break;
        }
        break;
      default:
        break;
    }
  }

  render(){
    return(
      <div id="svg-main">
        {this.renderToolbar()}
        <svg style={{minHeight:'100vh', width:'100%'}} id="svg-container"  onMouseDown={this.onMouseDown}>
          {
            this.state.rectangles.map((rectangle, index) => (
              <Rectangle data={rectangle} key="index" selectId={this.selectId} selected_id={this.state.selected_id}></Rectangle>
            ))
          }
        </svg>
      </div>
    )
  }
}

export default Main;