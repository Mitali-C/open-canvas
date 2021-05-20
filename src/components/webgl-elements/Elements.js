import React from 'react';

class Elements extends React.Component{
  constructor(props) {
     super(props);
  
     this.canvasRef = React.createRef();
  }

  componentDidMount(){
    // var canvas = document.querySelector("#canvas");
    let gl = this.canvasRef.current.getContext('experimental-webgl');

    // If we don't have a GL context, give up now
    if (!gl) {
      alert('Unable to initialize WebGL. Your browser or machine may not support it.');
      return;
    }



    // Vertex shader program
    const vsSource = `
      attribute vec4 a_position;
      
      void main() {
        gl_Position = a_position;
      }
    `;

    // Fragment shader program
    const fsSource = `
      void main() {
        gl_FragColor = vec4(1, 0.5, 1, 1);
      }
    `;

    // create GLSL shaders, upload the GLSL source, compile the shaders
    var vertexShader = this.createShader(gl, gl.VERTEX_SHADER, vsSource);
    var fragmentShader = this.createShader(gl, gl.FRAGMENT_SHADER, fsSource);

    // Link the two shaders into a program
    var program = this.createProgram(gl, vertexShader, fragmentShader);

    // look up where the vertex data needs to go.
    var positionAttributeLocation = gl.getAttribLocation(program, "a_position");

    // Create a buffer and put three 2d clip space points in it
    var positionBuffer = gl.createBuffer();

    // Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  
    var positions = [
      0, 0,
      0, 0.5,
      0.7, 0,
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    // code above this line is initialization code.
    // code below this line is rendering code.
  
    // webglUtils.resizeCanvasToDisplaySize(gl.canvas);

    // Tell WebGL how to convert from clip space to pixels
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    // Clear the canvas
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Tell it to use our program (pair of shaders)
    gl.useProgram(program);

    // Turn on the attribute
    gl.enableVertexAttribArray(positionAttributeLocation);

    // Bind the position buffer.
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
    var size = 2;          // 2 components per iteration
    var type = gl.FLOAT;   // the data is 32bit floats
    var normalize = false; // don't normalize the data
    var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
    var offset = 0;        // start at the beginning of the buffer
    gl.vertexAttribPointer(
        positionAttributeLocation, size, type, normalize, stride, offset);

    // draw
    var primitiveType = gl.TRIANGLES;
    offset = 0;
    var count = 3;
    gl.drawArrays(primitiveType, offset, count);
  }

  createShader = (gl, type, source) => {
    let shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (success) {
      return shader;
    }
  
    console.log(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
  }

  createProgram = (gl, vertexShader, fragmentShader) => {
    let program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    const success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (success) {
      return program;
    }
  
    console.log(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
  }

  render(){
    return(
      <div>
        <canvas id="canvas" ref={this.canvasRef} 
        style={{
          minHeight:'100vh', minWidth:'100vh', width:'auto', height:'auto', backgroundColor:'yellow'
          // width:400,
          // height:400
          }}></canvas>
      </div>
    )
  }
}

export default Elements;