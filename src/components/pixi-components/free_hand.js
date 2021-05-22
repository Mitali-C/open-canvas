import * as PIXI from "pixi.js";


const freehand = (x,y, app) => {
	var ppts = [];
	var mouse = [0,0];

	const mouseMoveFun = (e) => {
		// console.log('moving....')
			
		mouse[0] = typeof e.offsetX !== 'undefined' ? e.offsetX : e.layerX;
		mouse[1] = typeof e.offsetY !== 'undefined' ? e.offsetY : e.layerY;
			
		ppts.push([mouse[0],mouse[1]]);
		onPaint();
	}

	window.addEventListener('mousemove', mouseMoveFun, true);

	window.addEventListener('mousedown', function(e) {
			
		mouse[0] = typeof e.offsetX !== 'undefined' ? e.offsetX : e.layerX;
		mouse[1] = typeof e.offsetY !== 'undefined' ? e.offsetY : e.layerY;
			
		ppts.push([mouse[0],mouse[1]]);
			
		// onPaint();
	}, false);

	window.addEventListener('mouseup', function() {
		window.removeEventListener('mousemove', mouseMoveFun, true );
		// Emptying up Pencil Points
		// ppts = [];
	}, true);

	const onPaint = () => {
		//draw a line
		var g = new PIXI.Graphics();
		g.moveTo(ppts[0][0], ppts[0][1])
		let current = [ppts[0][0], ppts[0][1]]
		g.lineStyle(4, 0x000000, 1);
		for(let i = 1; i<ppts.length-2 ; i++){
			g.quadraticCurveTo(current[0], current[1], ppts[i][0], ppts[i][1])
			current = [ppts[i][0], ppts[i][1]];
			g.moveTo(ppts[i][0], ppts[i][1])
		}
		app.stage.addChild(g);
	}
}

export {freehand};