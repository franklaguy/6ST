// Author: R.Lewis - Date: 9/15/12 - nSb Publishing *********
	
var TALES = {
		frames: (window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (loop){ return window.setTimeout(loop, 1000/60);}),
		canvas: document.getElementById('canvas'),
		context: canvas.getContext('2d'),
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
		parseColor: function(color, toNumber){
			if (toNumber === true) {
			    if (typeof color === 'number') {
			      return (color | 0); //chop off decimal
			    }
			    if (typeof color === 'string' && color[0] === '#') {
			      color = color.slice(1);
			    }
			    return window.parseInt(color, 16);
			  } else {
			    if (typeof color === 'number') {
			      //make sure our hexadecimal number is padded out
			      color = '#' + ('00000' + (color | 0).toString(16)).substr(-6);
			    }

			    return color;
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
		initArrow: function(){ // Find mouse position and point to it with arrow
			var _tales 	= this,
				frames  = _tales.frames,
				mouse 	= _tales.mouse(_tales.canvas),
				arrow 	= new Arrow();
			
			arrow.x = _tales.canvas.width / 2;
			arrow.y = _tales.canvas.height / 2;
			
			(function drawArrow(){
				frames(drawArrow, _tales.canvas);
				_tales.context.clearRect(0, 0, _tales.canvas.width, _tales.canvas.height);
				
				var dx = mouse.x - arrow.x,
					dy = mouse.y - arrow.y;
				
				arrow.rotation = Math.atan2(dy, dx); // radians
				arrow.draw(_tales.context);
			}());
		},
		initBall: function(){
			var _tales = this,
				frames = _tales.frames,
				ball = new Ball(),
				angle = 0,
				angleX = 0,
				angleY = 0,
				centerScale = 1.1,
				centerX = _tales.canvas.width / 2,
				centerY = _tales.canvas.height / 2,
				range = 1,
				radius = 50,
				radiusX = 150,
				radiusY = 50,
				speed = 0.05,
				xspeed = 1,
				yspeed = 0.05,
				xpos = 0,
				ypos = centerY,
				mouse = _tales.mouse(_tales.canvas),
				log = document.getElementById('log'),
				rect = {x: _tales.canvas.width / 2, y: _tales.canvas.height / 2};
			
			_tales.context.lineWidth = 2;
			ball.x = 0;
			ball.y = _tales.canvas.height / 2;
			
			(function drawBall(){
				frames(drawBall, _tales.canvas);
				//_tales.context.clearRect(0, 0, _tales.canvas.width, _tales.canvas.height);
				
				angle += speed;
				ball.x += xspeed;
				ball.y = centerY / 2 + Math.sin(angle) * range;
				ball.scaleX = ball.scaleY = centerScale + Math.sin(angle) * range;			

				ball.x = centerX + Math.sin(angle) * radiusX;
				ball.y = centerY + Math.cos(angle) * radiusY;
				angleX += xspeed;
				angleY += yspeed;
				
				//ball.draw(_tales.context);
			}());
			
			(function drawWave(){
				//frames(drawWave, _tales.canvas);
				
				_tales.context.beginPath();
				_tales.context.moveTo(xpos, ypos);
				xpos += xspeed;
				angle += speed;
				ypos = centerY + Math.sin(angle) * 20;
				_tales.context.lineTo(xpos, ypos);
				_tales.context.stroke();
			}());
			
			(function drawLine(){
				frames(drawLine, _tales.canvas);
				_tales.context.clearRect(0, 0, _tales.canvas.width, _tales.canvas.height);
				
				var dx = rect.x - mouse.x,
					dy = rect.y - mouse.y,
					dist = Math.sqrt(dx * dx + dy * dy);
				
				_tales.context.fillStyle = "#000000";
				_tales.context.fillRect(rect.x - 2, rect.y - 2, 4, 4);
				_tales.context.beginPath();
				_tales.context.moveTo(rect.x, rect.y);
				_tales.context.lineTo(mouse.x, mouse.y);
				_tales.context.closePath();
				_tales.context.stroke();
				
				log.value = "distance: " + dist;
			}());
		}
}

window.onload = function () {
	TALES.header(); 		// Add necessary Links to header
	TALES.canvasCheck(); 	// Check to see if user has canvas capable modern browser
	TALES.arrowKeys(); 		// Check if user hits arrow keys - see console
	TALES.initMouse(); 		// Find mouse position - click inside canvas and check console
	TALES.initTouched(); 	// Find position - touch screen only
	TALES.initBall(); 		// Bouncing ball
}




