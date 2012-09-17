// Author: R.Lewis - Date: 9/15/12 - nSb Publishing *********
	
var TALES = {
		frames: window.requestAnimationFrame,
		canvas: document.getElementById('canvas'),
		header: function() {
			$('#available').click(function(){ window.location = "http://www.amazon.com/dp/B006GRZ0D8";});
			$('#logo').click(function(){ window.location = "http://www.sixstrangetales.com/";});
		},
		canvasCheck: function(){
			// Test for canvas - HTML5 - Modern Browsers - TODO: If older browser inform user 
			if (document.createElement('canvas').getContext){
				console.log("Success! The canvas element is supported.");
			}
		},
		mouse: function(findMe){
			var mouse = {x:0, y: 0};
			findMe.addEventListener('mousemove', function(event){
				var x,y;
				if (event.pageX || event.pageY){
					x = event.pageX;
					y = event.pageY;
				} else {
					x = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
					y = event.clientY + document.body.scrollTop + document.documentElement.scrollTop;
				}
				x -= findMe.offsetLeft;
				y -= findMe.offsetTop;
				mouse.x = x;
				mouse.y = y;
			}, false);
			return mouse;
		},
		touch: function(findMe){
			var touch = {x: null, y: null, isPressed: false};
			findMe.addEventListener('touchstart', function(event){
				touch.isPressed = true;
			}, false);
			findMe.addEventListener('touchend', function(event){
				touch.isPressed = false;
				touch.x = null;
				touch.y = null;
			}, false);
			findMe.addEventListener('touchmove', function(event){
				var x,y,
					touchEvent = event.touches[0]; // first touch
				if (touchEvent.pageX || touchEvent.pageY){
					x = touchEvent.pageX;
					y = touchEvent.pageY;
				} else {
					x = touchEvent.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
					y = touchEvent.clientY + document.body.scrollTop + document.documentElement.scrollTop;
				}
				
				x -= offsetLeft;
				y -= offsetTop;
				
				touch.x = x;
				touch.y = y;
			}, false);
			
			return touch;
		},
		arrowKeys: function(){
			function onKeyboardEvent(event){
				switch (event.keyCode){
				case 37:
					console.log("left!");
					break;
				case 38:
					console.log("up!");
					break;
				case 39:
					console.log("right");
					break;
				case 40:
					console.log("down!");
					break;
				default:
					console.log(event.keyCode);
				}
			}
			window.addEventListener('keydown', onKeyboardEvent, false);
		},
		Arrow: function(){
				this.x = 0;
				this.y = 0;
				this.color = "#ffff00";
				this.rotation = 0;
		},
		initMouse: function(){ // find mouse
			var _tales = this,
				mouse = _tales.mouse(_tales.canvas);
			
			canvas.addEventListener('mousedown', function(){console.log("x: " + mouse.x + ", y: " + mouse.y);}, false);
		},
		initTouched: function(){ // find touch - touch screen only
			var _tales = this,
				touch = _tales.touch(_tales.canvas);
			
			if (touch.isPressed){
				console.log("x: " + touch.x + ", y: " + touch.y);
				canvas.addEventListener('touchstart', onTouchEvent, false);
				canvas.addEventListener('touchend', onTouchEvent, false);
				canvas.addEventListener('touchmove', onTouchEvent, false);
			}
		},
		initArrow: function(){
			var _tales 	= this,
				frames  = _tales.frames,
				context = _tales.canvas.getContext('2d'),
				mouse 	= _tales.mouse(_tales.canvas),
				arrow 	= new _tales.Arrow();
			
			arrow.x = _tales.canvas.width / 2;
			arrow.y = _tales.canvas.height / 2;
		
			(function drawFrame(){
				if (!frames){
					frames = (window.webkitRequestAnimationFrame ||
						      window.mozRequestAnimationFrame ||
						      window.oRequestAnimationFrame ||
						      window.msRequestAnimationFrame ||
						      function (loop){
							  	 return window.setTimeout(loop, 1000/60);
						  	  }) ;
				}
				frames(drawFrame, _tales.canvas);
				context.clearRect(0, 0, _tales.canvas.width, _tales.canvas.height);
				
				var dx = mouse.x - arrow.x,
					dy = mouse.y - arrow.y;
				
				arrow.rotation = Math.atan2(dy, dx); // radians
				arrow.draw(context);
			}());
		}
}

TALES.Arrow.prototype.draw = function(context){
	context.save();
	context.translate(this.x, this.y);
	context.rotate(this.rotation);
	context.lineWidth = 2;
	context.fillStyle = this.color;
	context.beginPath();
	context.moveTo(-50, -25);
	context.lineTo(0, -25);
	context.lineTo(0, -50);
	context.lineTo(50, 0);
	context.lineTo(0, 50);
	context.lineTo(0, 25);
	context.lineTo(-50, 25);
	context.lineTo(-50, -25);
	context.closePath();
	context.fill();
	context.stroke();
	context.restore();
};

window.onload = function () {
	TALES.header(); 		// Add necessary Links to header
	TALES.canvasCheck(); 	// Check to see if user has canvas capable modern browser
	TALES.arrowKeys(); 		// Check if user hits arrow keys
	TALES.initMouse(); 		// Find mouse position
	TALES.initTouched(); 	// Find position - touch screen only
	TALES.initArrow(); 	// Find position - touch screen only
}




