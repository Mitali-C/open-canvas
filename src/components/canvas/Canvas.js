import React from 'react';
import { Stage, Layer, Line } from 'react-konva';
import circle_icon from '../../assets/icons/circle.png';
import rectangle_icon from '../../assets/icons/rectangle.png';
import pen_icon from '../../assets/icons/pen.png';
import eraser_icon from '../../assets/icons/eraser.png';
import select_icon from '../../assets/icons/cursor.png';
import { v4 as uuidv4 } from 'uuid';
import './canvas.scss';
import Rectangle from './rectangle/Rectangle';
import CustomCircle from './custom-circle/CustomCircle';

class Canvas extends React.Component{

  state = {
    rectangles:[],
    circles:[],
    selectedId:null,
    tool:'select',
    lines:[]
  }

  stageRef = React.createRef(null);

  isDrawing = React.createRef(false);

  handleMouseDown = (e) => {
    this.isDrawing.current = this.state.tool!=='select';
    const pos = e.target.getStage().getPointerPosition();
    let temp = this.state.lines;
    temp.push({ tool:this.state.tool, points: [pos.x, pos.y] });
    this.setState({lines:temp});
  };

  handleMouseMove = (e) => {
    const {lines}  = this.state;
    // no drawing - skipping
    if (!this.isDrawing.current || this.state.tool==='select') {
      return;
    }
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    let lastLine = lines[lines.length - 1];
    // add point
    lastLine.points = lastLine.points.concat([point.x, point.y]);

    // replace last
    // let temp = lines.splice(lines.length - 1, 1, lastLine);
    let temp = lines;
    temp[temp.length-1] = lastLine;
    this.setState({lines:temp})
    // setLines(lines.concat());
  };

  handleMouseUp = () => {
    this.isDrawing.current = false;
  };

  createRectangle = () => {
    let temp_rectangles = this.state.rectangles;
    temp_rectangles = temp_rectangles.concat({
      id: uuidv4(),
      width: 70,
      height: 90,
      // x: Math.random() * window.innerWidth,
      // y: Math.random() * window.innerHeight,
      x: window.innerWidth/2,
      y: window.innerHeight/2,
      stroke:'#000'
    });
    this.setState({rectangles: temp_rectangles});
  }

  createCircle = () => {
    let temp_circles = this.state.circles;
    temp_circles = temp_circles.concat({
      id: uuidv4(),
      width: 50,
      height: 50,
      // x: Math.random() * window.innerWidth,
      // y: Math.random() * window.innerHeight,
      x: window.innerWidth/2,
      y: window.innerHeight/2,
      stroke:'#000'
    });
    this.setState({circles: temp_circles});
  }

  checkDeselect = (e) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      this.setState({selectedId:null})
    }
  };

  render(){
    const {selectedId, rectangles, circles, lines} = this.state;
    return(
      <div className="canvas-toolbar-container">
        <div className="toolbar-container">
          <div className="icon-container" onClick={()=>{this.setState({tool:'select'})}}>
            <img src={select_icon} alt="select"></img>
          </div>
          <div className="icon-container" onClick={()=>{this.setState({tool:'pen'})}}>
            <img src={pen_icon} alt="pen"></img>
          </div>
          <div className="icon-container" onClick={()=>{this.setState({tool:'eraser'})}}>
            <img src={eraser_icon} alt="eraser"></img>
          </div>
          <div className="icon-container" onClick={this.createCircle}>
            <img src={circle_icon} alt="circle"></img>
          </div>
          <div className="icon-container" onClick={this.createRectangle}>
            <img src={rectangle_icon} alt="rectangle"></img>
          </div>
        </div>
        <div className="canvas-outer-container">
        <Stage width={window.innerWidth} height={window.innerHeight} ref={this.stageRef}
          onMouseDown={this.handleMouseDown}
          onMousemove={this.handleMouseMove}
          onMouseup={this.handleMouseUp}>
          <Layer>
            {lines.map((line, i) => (
              <Line
                key={i}
                points={line.points}
                stroke="#df4b26"
                strokeWidth={5}
                tension={0.5}
                lineCap="round"
                globalCompositeOperation={
                  line.tool === 'eraser' ? 'destination-out' : 'source-over'
                }
              />
            ))}
            {/* <Rect width={50} height={50} fill="red" /> */}
            {
              rectangles.map((rect, index) => (
                <Rectangle shapeProps={rect} isSelected={rect.id === selectedId}
                onSelect={() => {
                  this.setState({selectedId:rect.id})
                }}
                onChange={(newAttrs) => {
                  const rects = rectangles.slice();
                  rects[index] = newAttrs;
                  this.setState({rectangles:rects})
                }} ></Rectangle>
                // <Rect width={rect.height} height={rect.width} id={rect.id} x={rect.x} y={rect.y}  stroke={rect.stroke} draggable />
              ))
            }
            {
              circles.map((circle, index) => (
                <CustomCircle shapeProps={circle} isSelected={circle.id === selectedId}
                onSelect={() => {
                  this.setState({selectedId:circle.id})
                }}
                onChange={(newAttrs) => {
                  const circs = circles.slice();
                  circs[index] = newAttrs;
                  this.setState({circles:circs})
                }} ></CustomCircle>
                // <Circle width={rect.height} height={rect.width} id={rect.id} x={rect.x} y={rect.y}  stroke={rect.stroke} draggable />
              ))
            }
            {/* <Circle x={200} y={200} stroke="black" radius={50} /> */}
          </Layer>
        </Stage>
        </div>
      </div>
    )
  }
}

export default Canvas;