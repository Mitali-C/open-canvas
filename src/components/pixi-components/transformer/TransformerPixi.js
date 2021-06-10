/* eslint-disable no-loop-func */
import { Transformer } from '@pixi-essentials/transformer';

class TransformerPixi{
  constructor(parent, mouse, stopDrag, app){
    this.app = app;
    this.parent = parent;
    this.mouse = mouse;
    this.stopDrag = stopDrag;
    // const bounds = parent.getLocalBounds();
    // let xs = [bounds.x, bounds.x+parent.width, bounds.x+parent.width, bounds.x]
    // let ys = [bounds.y, bounds.y, bounds.y+parent.height, bounds.y+parent.height]
    // this.top_left(xs[0]-5, ys[0]-5, 10, 10, parent, mouse, this.stopDrag);
    // this.top_right(xs[1]-5, ys[1]-5, 10, 10, parent, mouse, this.stopDrag);
    // this.bottom_right(xs[2]-5, ys[2]-5, 10, 10, parent, mouse, this.stopDrag);
    // this.bottom_left(xs[3]-5, ys[3]-5, 10, 10, this.parent, this.mouse, this.stopDrag);
    this.app.stage.addChild(new Transformer({
      rotateEnabled: true,
      boxRotationEnabled: true,
      // boxScalingEnabled:true,
      group: [parent],
      wireframeStyle: {
        thickness: 1,
        color: 0xff0000
      }
  }));
  }
}

export {TransformerPixi};