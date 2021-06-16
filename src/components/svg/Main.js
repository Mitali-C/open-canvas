import React from 'react';
// import circle_icon from '../../assets/icons/circle.png';
import rectangle_icon from '../../assets/icons/rectangle.png';
// import pen_icon from '../../assets/icons/pen.png'; 
import select_icon from '../../assets/icons/cursor.png';
// import image_icon from '../../assets/icons/image_icon.png';
// import text_icon from '../../assets/icons/text.png';
// import note_icon from '../../assets/icons/note.png';
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

  selectId = (id) => {
    this.setState({selected_id:id})
  }

  renderToolbar = () => {
    return(
      <div className="toolbar-container">
      <div className="icon-container" onClick={()=>{this.setState({tool:'select'})}}>
        <img src={select_icon} alt="select"></img>
      </div>
      <div className="icon-container" onClick={()=>{
        this.setState({tool:'shape', shape_type:'rectangle'})
      }}>
        <img src={rectangle_icon} alt="rectangle"></img>
      </div>
    </div>
    )
  }

  onMouseDown = (e) => {
    this.setState({selected_id:''});
    switch(this.state.tool){
      case 'shape':
        switch(this.state.shape_type){
          case 'rectangle':
            let tempRects = this.state.rectangles;
            tempRects.push({x:e.pageX, y: e.pageY, width:100, height:100, id:uuidv4()});
            this.setState({rectangles: tempRects, tool:'select'});
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