// Class Point
function Point(x, y, r, fill) {
  this.x = x || 0;
  this.y = y || 0;
  this.radius = r || 0;
  this.fill = fill || '#AAAAAA';
}

// Checks if Point contains the mouse coordinates
Point.prototype.contains = function(mx, my) {
  var distsq = (mx-this.x) * (mx-this.x) + (my-this.y) * (my-this.y);
  rsq = this.radius * this.radius;

  return distsq < rsq;
}

// Draws Point
Point.prototype.draw = function(ctx) {
  ctx.fillStyle = this.fill;
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
  ctx.fill();
}

// Draws line
function drawLine( line, ctx ) {
  ctx.beginPath();
  ctx.moveTo(line[0].x, line[0].y);
  ctx.lineTo(line[1].x, line[1].y);
  ctx.closePath();
  ctx.stroke();
}

// Class Canvas
function CanvasState(canvas) {
  var wrapper = document.getElementById("canvas");
  canvas.width = wrapper.offsetWidth;
  canvas.height = wrapper.offsetHeight;
  this.canvas = canvas;
  this.width = canvas.width;
  this.height = canvas.height;
  this.ctx = canvas.getContext("2d");

  // Keep track of state
  this.point = null;
  this.points = [];
  this.lines = [];
  this.mouse = null;
  this.drag = false;
  this.drawing = false;
  this.moveMouse = null;
  this.selection = null;
  this.isMoving = false;

  var myState = this;

  // *** Events ***

  // Mouse Up
  /* Cases:
      1. If the mouse is the same as the State mouse
          --> the event is a "click" so it adds a new Point
      2. If the mouse is the same as the State mouse but
        it's dragging --> it just drags so it doesn't add any
        new Points
      3. If the mouse is the same as the State mouse but
        it's NOT dragging --> adds a new Point in the same place
  */
  canvas.addEventListener("mouseup", function(e) {
    var mouse = myState.getMouse(e);
    var point = myState.point;

    if (mouse = myState.mouse) {
      if (myState.drag) {
        if (!myState.isMoving) {
          myState.point = myState.addPoint(
            new Point(point.x, point.y, 10, 'rgb(0,255,0)')
          );
        }
      } else {
        myState.point = myState.addPoint(
            new Point(mouse.x -2, mouse.y -2, 10, 'rgb(0,255,0)')
          );
      }
    }
    myState.drag = false;
    myState.pointsDrag = [];

  }, true);

  // Mouse Down
  // If the mouse coordinates are in a Point, it can be dragged
  canvas.addEventListener("mousedown", function(e) {
    myState.mouse = myState.getMouse(e);
    
    var points = myState.points;
    var length = points.length;

    for ( var i = 0; i <= length -1; i++) {
      if (points[i].contains(myState.mouse.x, myState.mouse.y)) {
        myState.drag = true;
        myState.point = points[i];
        myState.pointsDrag.push(points[i]);
      } 
    }

  }, true);

  // Mouse Move
  /* Cases:
      1. If it's not dragging 
        --> changes the Point's colour if it passes above it
      2. If it's dragging
        --> drags the Point
  */
  canvas.addEventListener("mousemove", function(e) {
    var mouse = myState.getMouse(e);
    
    if (!myState.drag) {
      isMouseInPoint(mouse, myState.points ,myState.ctx);
      /*
      if (isEven(myState.points.length)) return;
      
      var point = myState.point;
      myState.moveMouse = myState.getMouse(e);
      requestAnimationFrame( function() { myState.draw() } );
      */
    } else {
      myState.isMoving = true;
      var points = myState.pointsDrag;
      var length = points.length;
      
      for ( var i = 0; i <= length - 1; i++ ) {
        points[i].x = mouse.x;
        points[i].y = mouse.y;
      }
    }

  }, true);

  requestAnimationFrame( function() { myState.draw() } );
}

// Add new Point
CanvasState.prototype.addPoint = function(point) {
  var myState = this;

  myState.points.push(point);
  if (isEven(myState.points.length)) {
    myState.addLines(myState.points);
  }
  
  requestAnimationFrame( function() { myState.draw() } );
  return point;
}

// Add Lines
CanvasState.prototype.addLines = function(points) {
  var myState = this;
  var l = points.length;
  myState.lines.push([points[l-2], points[l-1]]);
}

// Draws the Canvas State
CanvasState.prototype.draw = function() {
  var myState = this;
  var points = myState.points;
  var lines = myState.lines;
  var length = points.length;
  var l = lines.length;

  myState.clear();

  // Draw lines
  for ( var i = 0; i <= l - 1; i ++ ) {
    drawLine(lines[i], myState.ctx);
  }

  // Draw Points
  for ( var i = 0; i <= length - 1; i++) {
    if (i == 0) {
      points[i].draw(myState.ctx); 
      continue;
    }
    
    points[i - 1].draw(myState.ctx);
    points[i].draw(myState.ctx);
  }


/*  Draw line from Point to cursor
  ----
    if (isEven(myState.points.length)) return;
    var point = myState.point;
    var ctx = myState.ctx;
    var mouse = myState.moveMouse;
    //if ( point == null ) return;
    if ( mouse == null ) return;
    ctx.beginPath();
    ctx.moveTo(point.x, point.y);
    ctx.lineTo(mouse.x, mouse.y);
    ctx.closePath();
    ctx.stroke();
*/
    
  requestAnimationFrame( function() { myState.draw() } );
}

// Get mouse position taking into account paddings and borders
CanvasState.prototype.getMouse = function(e) {
  var element = this.canvas, offsetX = 0, offsetY = 0, mx, my;
  
  // Compute the total offset
  if (element.offsetParent !== undefined) {
    do {
      offsetX += element.offsetLeft;
      offsetY += element.offsetTop;
    } while ((element = element.offsetParent));
  }

  mx = e.pageX - offsetX;
  my = e.pageY - offsetY;
  
  return {x: mx, y: my};
}

// Clear Canvas
CanvasState.prototype.clear = function() {
  this.ctx.clearRect(0, 0, this.width, this.height);
}

// Checks if the cursor is inside a Point
function isMouseInPoint(mouse, data, ctx) {
  var length = data.length;
  for ( var i = 0; i <= length - 1; i++) {
    if (data[i].contains(mouse.x, mouse.y)) {
      data[i].fill = "rgb(255,0,0)";
      data[i].draw(ctx);
    } else {
      data[i].fill = "rgb(0,255,0)";
      data[i].draw(ctx);
    }
  }
}

// Checks if object is empty
function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

// Checks if a number is even
function isEven(n) {
   return n % 2 == 0;
}

// Checks if a number is odd
function isOdd(n) {
   return Math.abs(n % 2) == 1;
}

// Computes distance between 2 Points
function dist(p1,p2) {
  return Math.hypot(p2.x-p1.x, p2.y-p1.y);
}

function init() {
  var s = new CanvasState(document.querySelector("canvas"));
}

function start() {
  init();
}