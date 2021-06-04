import * as PIXI from "pixi.js";


const freehand = (x,y, app) => {
	var ppts = [];
	var mouse = [0,0];

	var g = new PIXI.Graphics();

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
		// console.log(g.getLocalBounds());
		// let bounds = g.getLocalBounds();
		// let xs = [bounds.x, bounds.x+bounds.width, bounds.x+bounds.width, bounds.x]
		// let ys = [bounds.y, bounds.y, bounds.y+bounds.height, bounds.y+bounds.height]
		// for(let i=0; i<4; i++)
		// {
		// 	let handle = new PIXI.Graphics();
		// 	handle.lineStyle(2, 0x006EFF, 1);
		// 	handle.beginFill(0xFFFFFF, 1);

		// 	handle.drawRect(xs[i]-5, ys[i]-5, 10, 10);
		// 	handle.alpha = 1
		// 	handle.endFill();
		// 	g.addChild(handle)
		// }
	}, true);

	const clicked = () => {
		// Emptying up Pencil Points
		// ppts = [];
		console.log(g.getLocalBounds());
		console.log('clicked')
		let bounds = g.getLocalBounds();
		let xs = [bounds.x, bounds.x+bounds.width, bounds.x+bounds.width, bounds.x]
		let ys = [bounds.y, bounds.y, bounds.y+bounds.height, bounds.y+bounds.height]
		for(let i=0; i<4; i++)
		{
			let handle = new PIXI.Graphics();
			handle.lineStyle(2, 0x006EFF, 1);
			handle.beginFill(0xFFFFFF, 1);

			handle.drawRect(xs[i]-5, ys[i]-5, 10, 10);
			handle.alpha = 1
			handle.endFill();
			g.addChild(handle)
		}
	};

	const onPaint = () => {
		// //draw a line
		// var g = new PIXI.Graphics();
		g.moveTo(ppts[0][0], ppts[0][1])
		let current = [ppts[0][0], ppts[0][1]]
		g.lineStyle(4, 0x000000, 0.5);
		for(let i = 1; i<ppts.length-2 ; i++){
			g.quadraticCurveTo(current[0], current[1], ppts[i][0], ppts[i][1])
			current = [ppts[i][0], ppts[i][1]];
			g.moveTo(ppts[i][0], ppts[i][1])
		}
		g.interactive = true;

		g.mousedown = clicked;
		console.log(g.getLocalBounds())
		app.stage.addChild(g);
	}
}

export {freehand};