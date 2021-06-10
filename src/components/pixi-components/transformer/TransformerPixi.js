/* eslint-disable no-loop-func */
import { Transformer } from '@pixi-essentials/transformer';

class TransformerPixi{
  constructor(parent, app){
    this.app = app;
    this.parent = parent;
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