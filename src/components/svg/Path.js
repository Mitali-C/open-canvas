import React from 'react';
import interact from 'interactjs';

class Path extends React.Component{
  state = {
    width:0,
    height:0,
    x:0, 
    y:0,
    id:'',
    selected_id:'',
    selected: true
  }
  static getDerivedStateFromProps(props, state) {
    if(props.selected_id !== state.selected_id){
        //Change in props
        return{
          selected_id: props.selected_id
        };
    }
    return null; // No change to state
  }

  componentDidUpdate(prevState, prevProps) {
    // if(this.props.selected_id!==prevState.selected_id && this.props.selected_id!==this.state.id){
    //   this.setState({selected:false});
    //   this.removeTransformer();
    // }
  }

  componentDidMount(){
    this.setState({id:this.props.data.id})
  }

  onClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.props.selectId(this.state.id);
    var myPathBox = document.getElementsByClassName(`drag-svg-${this.state.id}`)[0].getBBox();
    if(myPathBox){
      this.setState({x:myPathBox.x, y:myPathBox.y, width:myPathBox.width, height:myPathBox.height})
    }
    const {selected_id} = this.props;
    if(selected_id!==this.state.id){
      this.props.selectId(this.state.id);
      // this.addTransformer();
    }
  }

  render(){
    const {data} = this.props;let path = '';
    let points = data.points.slice(0);
    if (points.length > 0) {
      path = `M ${points[0].x} ${points[0].y}`;
      var p1, p2, end;
      for (var i = 1; i < points.length - 2; i += 2) {
        p1 = points[i];
        p2 = points[i + 1];
        end = points[i + 2];
        path += ` C ${p1.x} ${p1.y}, ${p2.x} ${p2.y}, ${end.x} ${end.y}`;
      }
    }
    return(
      <g>
        <path id={this.state.id} className={`drag-svg-${this.state.id}`} key={path} stroke="blue" strokeWidth={2} d={path} fill="none" onMouseDown={this.onClick}></path>
        {
          this.state.id === this.props.selected_id && (
            <>
            <rect className={`drag-svg-bounds-${this.state.id}`} x={this.state.x} y={this.state.y} width={this.state.width} height={this.state.height} stroke="black" fill="transparent" stroke-width="1" onClick={this.click}></rect>
            {/* connecting lines */}
            <line x1={this.state.x-5} y1={this.state.y-5} x2={this.state.x+this.state.width+5} y2={this.state.y-5}  style={{stroke:'#6cb7ff', strokeWidth:1}} ></line>
            <line x1={this.state.x-5} y1={this.state.y-5} x2={this.state.x-5} y2={this.state.y+this.state.height+5}  style={{stroke:'#6cb7ff', strokeWidth:1}} ></line>
            <line x1={this.state.x+this.state.width+5} y1={this.state.y-5} x2={this.state.x+this.state.width+5} y2={this.state.y+this.state.height+5}  style={{stroke:'#6cb7ff', strokeWidth:1}} ></line>
            <line x1={this.state.x-5} y1={this.state.y+this.state.height+5} x2={this.state.x+this.state.width+5} y2={this.state.y+this.state.height+5}  style={{stroke:'#6cb7ff', strokeWidth:1}} ></line>
            {/* top left */}
            <circle cx={this.state.x-5} cy={this.state.y-5} r="5" stroke="#6cb7ff" stroke-width="1" fill="#FFF" />
            {/* bottom right */}
            <circle cx={this.state.x+this.state.width+5} cy={this.state.y+this.state.height+5} r="5" stroke="#6cb7ff" stroke-width="1" fill="#FFF" />
            {/* top right */}
            <circle cx={this.state.x+this.state.width+5} cy={this.state.y-5} r="5" stroke="#6cb7ff" stroke-width="1" fill="#FFF" />
            {/* bottom left */}
            <circle cx={this.state.x-5} cy={this.state.y+this.state.height+5} r="5" stroke="#6cb7ff" stroke-width="1" fill="#FFF" />
            </>
          )
        }
      </g>
    )
  }
}

export default Path;