import React from 'react';
import interact from 'interactjs';

class Circle extends React.Component{
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
    if(this.props.selected_id!==prevState.selected_id && this.props.selected_id!==this.state.id){
      this.setState({selected:false});
      this.removeTransformer();
    }
  }

  componentDidMount(){
    const {data} = this.props;
    this.setState({width:data.width, height:data.height, x:data.x, y:data.y, id: data.id, selected:true});
    this.props.selectId(this.props.data.id);
    this.addTransformer();
  }

  dragMoveListener = (event) =>{
    var target = event.target,
        // keep the dragged position in the data-x/data-y attributes
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    // translate the element
    target.style.webkitTransform =
    target.style.transform =
      'translate(' + x + 'px, ' + y + 'px)';

    // update the position attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
    this.setState({x: event.rect.left+this.state.width, y: event.rect.top+this.state.height})
  }

  addTransformer = () => {
    const {data} = this.props;
    interact(`.drag-svg-${data.id}`)
    .draggable({
      onmove: this.dragMoveListener
    })
    .resizable({
      preserveAspectRatio: false,
      edges: { left: true, right: true, bottom: true, top: true }
    })
    .on('resizemove',  (event) => {
      var target = event.target,
          x = (parseFloat(target.getAttribute('data-x')) || 0),
          y = (parseFloat(target.getAttribute('data-y')) || 0);

      // update the element's style
      target.style.width  = event.rect.width + 'px';
      target.style.height = event.rect.height + 'px';

      // translate when resizing from top or left edges
      x += event.deltaRect.left;
      y += event.deltaRect.top;

      target.style.webkitTransform = target.style.transform =
          'translate(' + x + 'px,' + y + 'px)';

      target.setAttribute('data-x', x);
      target.setAttribute('data-y', y);
      target.textContent = event.rect.width + '×' + event.rect.height;
      this.setState({x: this.state.x+event.deltaRect.left, y: this.state.y+event.deltaRect.top, width:event.rect.width/2, height: event.rect.height/2})
    });
  }

  removeTransformer = () => {
    const {data} = this.props;
    interact(`.drag-svg-${data.id}`).unset();
  }

  click = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const {selected_id} = this.props;
    if(selected_id!==this.state.id){
      this.props.selectId(this.state.id);
      this.addTransformer();
    }
  }

  render(){
    return(
      <g>
        <ellipse id={this.state.id} className={`drag-svg-${this.state.id}`} cx={this.props.data.x} cy={this.props.data.y} rx={this.state.width} ry={this.state.height} stroke="black" fill="transparent" stroke-width="1" onClick={this.click}></ellipse>
        {
          this.state.id === this.state.selected_id && (
            <>
            {/* <rect></rect> */}
            {/* connecting lines */}
            {/* top */}
            <line x1={this.state.x-this.state.width} y1={this.state.y-this.state.height} x2={this.state.x+this.state.width} y2={this.state.y-this.state.height}  style={{stroke:'#6cb7ff', strokeWidth:1}} ></line>
            {/* left */}
            <line x1={this.state.x-this.state.width} y1={this.state.y-this.state.height} x2={this.state.x-this.state.width} y2={this.state.y+this.state.height}  style={{stroke:'#6cb7ff', strokeWidth:1}} ></line>
            {/* right */}
            <line x1={this.state.x+this.state.width} y1={this.state.y-this.state.height} x2={this.state.x+this.state.width} y2={this.state.y+this.state.height}  style={{stroke:'#6cb7ff', strokeWidth:1}} ></line>
            {/* bottom */}
            <line x1={this.state.x-this.state.width} y1={this.state.y+this.state.height} x2={this.state.x+this.state.width} y2={this.state.y+this.state.height}  style={{stroke:'#6cb7ff', strokeWidth:1}} ></line>
            {/* top left */}
            <circle cx={this.state.x-this.state.width} cy={this.state.y-this.state.height} r="5" stroke="#6cb7ff" stroke-width="1" fill="#FFF" />
            {/* bottom right */}
            <circle cx={this.state.x+this.state.width} cy={this.state.y+this.state.height} r="5" stroke="#6cb7ff" stroke-width="1" fill="#FFF" />
            {/* top right */}
            <circle cx={this.state.x+this.state.width} cy={this.state.y-this.state.height} r="5" stroke="#6cb7ff" stroke-width="1" fill="#FFF" />
            {/* bottom left */}
            <circle cx={this.state.x-this.state.width} cy={this.state.y+this.state.height} r="5" stroke="#6cb7ff" stroke-width="1" fill="#FFF" />

            {/* ------------- */}
            {/* top center */}
            <circle cx={this.state.x} cy={this.state.y-this.state.height} r="5" stroke="#6cb7ff" stroke-width="1" fill="#FFF" ></circle>
            {/* right center */}
            <circle cx={this.state.x+this.state.width} cy={this.state.y} r="5" stroke="#6cb7ff" stroke-width="1" fill="#FFF" ></circle>
            {/* left center */}
            <circle cx={this.state.x-this.state.width} cy={this.state.y} r="5" stroke="#6cb7ff" stroke-width="1" fill="#FFF" ></circle>
            {/* bottom center */}
            <circle cx={this.state.x} cy={this.state.y+this.state.height} r="5" stroke="#6cb7ff" stroke-width="1" fill="#FFF" ></circle>

            {/* <path d={`M ${this.state.x} ${this.state.y-this.state.height} c ${this.state.x-this.state.width} ${this.state.y-this.state.height} ${this.state.x-this.state.width} ${this.state.y}`} stroke="blue" stroke-width="5" fill="none" /> */}
            </>
          )
        }
      </g>
    )
  }
}

export default Circle;