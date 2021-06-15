import React from 'react';
// import subjx from 'subjx';
import 'subjx/dist/style/subjx.css';

class Rectangle extends React.Component{
  state = {
    width:0,
    height:0,
    x:0, 
    y:0,
    id:''
  }

  componentDidMount(){
    const {data} = this.props;
    this.setState({width:data.width, height:data.height, x:data.x, y:data.y, id: data.id});
  }

  addTransformer = () => {
    if(this.props.selected_id!==this.state.id){
      this.props.selectId(this.state.id);
    }
  }

  render(){
    return(
      <rect id={this.state.id} className={`drag-svg-${this.state.id}`} x={this.state.x} y={this.state.y} width={this.state.width} height={this.state.height} stroke="green" fill="transparent" stroke-width="5" onClick={this.addTransformer}></rect>
    )
  }
}

export default Rectangle;