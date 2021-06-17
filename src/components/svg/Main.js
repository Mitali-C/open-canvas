import React from 'react';
import circle_icon from '../../assets/icons/circle.png';
import rectangle_icon from '../../assets/icons/rectangle.png';
import pen_icon from '../../assets/icons/pen.png'; 
import select_icon from '../../assets/icons/cursor.png';
import image_icon from '../../assets/icons/image_icon.png';
// import text_icon from '../../assets/icons/text.png';
// import note_icon from '../../assets/icons/note.png';
import './main.scss';
import Rectangle from './Rectangle';
import { v4 as uuidv4 } from 'uuid';
import Path from './Path';
import Circle from './Circle';
import {data as image_data} from './temp_images';
import Image from './Image';

class Main extends React.Component{
  state = {
    tool:"select",
    shape_type:'',
    rectangles: [

    ],
    circles:[],
    selected_id:'',
    paths:[],
    isDrawing:false,
    images_list:[],
    images:[]
  }

  componentDidMount(){
    let temp_img_list = [];
    for(let i =0 ; i<image_data.length; i++){
      temp_img_list.push(image_data[i].urls.thumb);
    }
    this.setState({images_list: temp_img_list});
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
      <div className="icon-container" onClick={()=>{
        this.setState({tool:'shape', shape_type:'circle'})
      }}>
        <img src={circle_icon} alt="rectangle"></img>
      </div>
      <div className="icon-container" onClick={()=>{this.setState({tool:'pen'})}}>
        <img src={pen_icon} alt="pen"></img>
      </div>
      <div className="icon-container" onClick={()=>{this.setState({tool:'image'})}}>
        <img src={image_icon} alt="pen"></img>
      </div>
    </div>
    )
  }

  onMouseDown = (e) => {
    // this.setState({selected_id:''});
    switch(this.state.tool){
      case 'pen':
        this.setState({isDrawing:true});
        let tempPaths = this.state.paths;
        tempPaths.push({x:e.pageX, y: e.pageY, id:uuidv4(), points:[{x:e.pageX, y:e.pageY }]});
        this.setState({paths: tempPaths});
        break;
      case 'image':
        const image_index = (Math.random() * (30 - 0) + 0).toFixed(0);
        let tempImages = this.state.images;
        tempImages.push({x:e.pageX, y: e.pageY, id:uuidv4(), points:[{x:e.pageX, y:e.pageY }], width:0, height:0, src:this.state.images_list[image_index]});
        this.setState({images: tempImages});
        break;
      case 'shape':
        switch(this.state.shape_type){
          case 'rectangle':
            let tempRects = this.state.rectangles;
            tempRects.push({x:e.pageX, y: e.pageY, width:100, height:100, id:uuidv4(), type:'rectangle'});
            this.setState({rectangles: tempRects});
            break;
          case 'circle':
            let tempCircle = this.state.circles;
            tempCircle.push({x:e.pageX, y: e.pageY, width:50, height:100, id:uuidv4(), type:'circle'});
            this.setState({circles: tempCircle});
            break;
          default:
            break;
        }
        break;
      default:
        break;
    }
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

  onMouseUp = () => {
    this.setState({isDrawing:false})
  }

  onMouseMove = (e) => {
    if(this.state.isDrawing){
      let paths = this.state.paths;
      const x = e.pageX;
      const y = e.pageY;
      let temp = paths[paths.length-1];
      let temp_points=[];
      if(temp.points){
        temp_points = temp.points;
      }
      temp_points.push({x,y});
      temp.points = temp_points;
      paths.pop();
      paths.push(temp);
      this.setState({paths})
    }
  }

  render(){
    return(
      <div id="svg-main">
        {this.renderToolbar()}
        <svg style={{minHeight:'100vh', width:'100%', cursor:this.getCursorType()}} id="svg-container"  onMouseDown={this.onMouseDown} onMouseUp={this.onMouseUp} onMouseMove={this.onMouseMove}>
          {
            this.state.rectangles.map((rectangle, index) => (
              <Rectangle data={rectangle} key="index" selectId={this.selectId} selected_id={this.state.selected_id} shape_type={this.state.shape_type}></Rectangle>
            ))
          }
          {
            this.state.circles.map((circle, index) => (
              <Circle data={circle} key="index" selectId={this.selectId} selected_id={this.state.selected_id} shape_type={this.state.shape_type}></Circle>
            ))
          }
          {
            this.state.paths.map(path => (
              <Path data={path} selectId={this.selectId} selected_id={this.state.selected_id}></Path>
            ))
          }
          {
            this.state.images.map(path => (
              <Image data={path} selectId={this.selectId} selected_id={this.state.selected_id}></Image>
            ))
          }
          {/* <image href="https://images.unsplash.com/photo-1544885348-6cf79234ad61?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMzExNDd8MHwxfHNlYXJjaHwxfHxwYXN0ZWwlMjBjb2xvcnN8ZW58MHx8fHwxNjIxODUxNjQ0&ixlib=rb-1.2.1&q=80&w=200" onLoad={()=>{console.log('loaded')}}/> */}
        </svg>
      </div>
    )
  }
}

export default Main;